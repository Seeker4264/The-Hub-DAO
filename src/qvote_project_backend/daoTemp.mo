import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
// import Array "mo:base/Array";
import Cycles "mo:base/ExperimentalCycles";
// import Hash "mo:base/Hash";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";

import Types "daoTemp.types";

actor class DAO(name : Text, manifesto : Text, coinName : Text, coinSymbol : Text) {
    
    type Member = Types.Member;
    type Vote = Types.Vote;
    type Proposal = Types.Proposal;
    type ProposalId = Types.ProposalId;
    type ProposalStatus = Types.ProposalStatus;
    type ProposalContent = Types.ProposalContent;
    type PostId = Types.PostId;
    type PostContent = Types.PostContent;
    type Post = Types.Post;
    type Comment = Types.Comment;
    type HashMap<K, V> = Types.HashMap<K, V>;
    type Result<Ok, Err> = Types.Result<Ok, Err>;


    let daoName : Text = name;
    var daoManifesto : Text = manifesto;
    let daoGoals = Buffer.Buffer<Text>(0);

    let daoMembers = HashMap.HashMap<Principal, Member>(0, Principal.equal, Principal.hash);

    let daoLedger = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);
    let tkName : Text = coinName;
    let tkSymbol : Text = coinSymbol;

    stable var nextProposalId : Nat64 = 0;
    let daoProposals = HashMap.HashMap<ProposalId, Proposal>(0, Nat64.equal, Nat64.toNat32);

    stable var nextPostId : Nat64 = 0;
    let daoPosts = HashMap.HashMap<PostId, Post>(0, Nat64.equal, Nat64.toNat32);

    //                                            //
    //  getter/setter for DAO name and manifesto  //
    //                                            //

    public shared query func getName() : async Text {
        return daoName;
    };

    public shared query func getManifesto() : async Text {
        return daoManifesto;
    };

    public func setManifesto(newManifesto : Text) : async () {
        daoManifesto := newManifesto;
        return;
    };

    public func addGoal(newGoal : Text) : async () {
        daoGoals.add(newGoal);
        return;
    };

    public shared query func getGoals() : async [Text] {
        Buffer.toArray(daoGoals);
    };

    //                       //
    //  DAO members methods  //
    //                       //

    public shared ({ caller }) func addMember(name : Text, age : Nat) : async Result<(), Text> {
        let member : Member = { principal = caller; name; age };

        switch (daoMembers.get(caller)) {
            case (null) {
                daoMembers.put(caller, member);
                return #ok();
            };
            case (?member) {
                return #err("Member already exists");
            };
        };
    };

    public shared ({ caller }) func updateMember(memberUp : Member) : async Result<(), Text> {
        switch (daoMembers.get(caller)) {
            case (null) {
                return #err("Member does not exist");
            };
            case (?_member) {
                daoMembers.put(caller, memberUp);
                return #ok();
            };
        };
    };

    public shared ({ caller }) func removeMember() : async Result<(), Text> {
        switch (daoMembers.get(caller)) {
            case (null) {
                return #err("Member does not exist");
            };
            case (?_member) {
                daoMembers.delete(caller);
                return #ok();
            };
        };
    };

    public shared query func getMember(p : Principal) : async Result<Member, Text> {
        switch (daoMembers.get(p)) {
            case (null) {
                return #err("Member does not exist");
            };
            case (?member) {
                return #ok(member);
            };
        };
    };

    public shared query func getAllPrincipals() : async [Principal] {
        return Iter.toArray(daoMembers.keys());
    };

    public shared query func getAllMembers() : async [Member] {
        return Iter.toArray(daoMembers.vals());
    };

    public shared query func numMembers() : async Nat {
        return daoMembers.size();
    };

    //                     //
    //  DAO token methods  //
    //                     //

    public query func tokenName() : async Text {
        return tkName;
    };

    public query func tokenSymbol() : async Text {
        return tkSymbol;
    };

    public func mint(owner : Principal, amount : Nat) : async Result<(), Text> {
        let balanceOwner = Option.get(daoLedger.get(owner), 0);
        daoLedger.put(owner, balanceOwner + amount);

        return #ok();
    };

    public func burn(owner : Principal, amount : Nat) : async Result<(), Text> {
        let balanceOwner = Option.get(daoLedger.get(owner), 0);
        if(amount > balanceOwner) {
            return #err("This principal doesn't have enough balance to burn");
        };
        daoLedger.put(owner, balanceOwner - amount);
        return #ok();
    };

    public shared func transfer(from : Principal, to : Principal, amount : Nat) : async Result<(), Text> {
        let balanceFrom = Option.get(daoLedger.get(from), 0);
        let balanceTo = Option.get(daoLedger.get(to), 0);

        if(amount > balanceFrom) {
            return #err("The 'From' balance isn't enough for the transfer");
        };

        daoLedger.put(from, balanceFrom - amount);
        daoLedger.put(to, balanceTo + amount);

        return #ok();
    };

    public query func balanceOf(acc: Principal) : async Nat {
        return (Option.get(daoLedger.get(acc), 0));
    };

    public query func totalSupply() : async Nat {
        var totalBal = 0;

        for(balance in daoLedger.vals()) {
            totalBal := totalBal + balance;
        };

        return totalBal;
    };

    //                 //
    //  DAO Proposals  //
    //                 //

    public shared ({ caller }) func createProposal(content : ProposalContent) : async Result<ProposalId, Text> {
        if(Option.isNull(daoMembers.get(caller))) {
            return #err("You need to be a member to create a proposal");
        };

        let balanceCaller = Option.get(daoLedger.get(caller), 0);
        if(balanceCaller < 1) {
            return #err("You need at least 1 ' # tkName # ' token to create a proposal");
        };
        let newProposal = {
            id = nextProposalId;
            content;
            creator = caller;
            created = Time.now();
            executed = null;
            votes = [];
            voteScore = 0;
            status = #Open;
        };
        daoProposals.put(nextProposalId, newProposal);
        _burn(caller, 1);
        nextProposalId += 1;
        return #ok(nextProposalId - 1);
    };

    public shared func getProposal(proposalId : ProposalId) : async ?Proposal {
        return daoProposals.get(proposalId);
    };

    public shared func getAllProposal() : async [Proposal] {
        return Iter.toArray(daoProposals.vals());
    };
    
    public shared ({ caller }) func voteProposal(proposalId : ProposalId, yesOrNo : Bool) : async Result<(), Text> {
        if(Option.isNull(daoMembers.get(caller))) {
            return #err("You need to be a member to vote for a proposal");
        };
        switch(daoProposals.get(proposalId)) {
            case(null) {
                return #err("No proposal found");
            };
            case(? proposal) {
                if(_hasVoted(proposal, caller)) {
                    return #err("You can only vote once per proposal");
                };

                let newProposal = _newProposal(proposal, caller, yesOrNo);
                daoProposals.put(proposal.id, newProposal);

                if(newProposal.status == #Accepted) {
                    _execute(newProposal);
                };
                return #ok();
            };

        };
    };

    func _hasVoted(proposal : Proposal, p : Principal) : Bool {
        for(vote in proposal.votes.vals()) {
            if(vote.member == p) {
                return true;
            };
        };
        return false;
    };

    func _newProposal(proposal : Proposal, voter : Principal, yesOrNo : Bool) : Proposal {
        let votingPower = Option.get(daoLedger.get(voter), 0);
        let multiplier = switch(yesOrNo) {
            case(true) {1};
            case(false) {-1};
        };
        let callerVoteScore = votingPower * multiplier;
        let newVotes = Buffer.fromArray<Vote>(proposal.votes);
        newVotes.add({
            member = voter;
            votingPower;
            yesOrNo;
        });
        let newScore = proposal.voteScore + callerVoteScore;
        let newStatus = if(newScore >= 100) {
            #Accepted;
        } else if(newScore <= - 100) {
            #Rejected;
        } else {
            #Open;
        };
        let newProposal = {
            id = proposal.id;
            content = proposal.content;
            creator = proposal.creator;
            created = proposal.created;
            executed = proposal.executed;
            votes = Buffer.toArray(newVotes);
            voteScore = newScore;
            status = newStatus;
        };
        return newProposal;
    };

    func _execute(proposal : Proposal) : () {
        switch(proposal.content) {
            case(#ChangeManifesto(newManifesto)) {
                daoManifesto := newManifesto;
            };
            case(#AddGoal(newGoal)) {
                daoGoals.add(newGoal);
            };
        };
        let newProposal = {
            id = proposal.id;
            content = proposal.content;
            creator = proposal.creator;
            created = proposal.created;
            executed = ?Time.now();
            votes = proposal.votes;
            voteScore = proposal.voteScore;
            status = proposal.status;
        };
        daoProposals.put(proposal.id, newProposal);
        return;
    };
    
    //                        //
    //  DAO Posts & Comments  //
    //                        //

    public shared ({ caller }) func createPost(content : PostContent) : async Result<Text, Text> {
        if(Option.isNull(daoMembers.get(caller))) {
            return #err("You need to be a member to create a proposal");
        };

        let newPost = {
            id = nextPostId;
            author = caller;
            created = Time.now();
            content;
            likes = [];
            comments = [];
        };

        daoPosts.put(nextPostId, newPost);
        nextPostId += 1;
        return #ok(Principal.toText(caller) # " created a post");
    };

    public shared func getPost(postId : PostId) : async ?Post {
        return daoPosts.get(postId);
    };

    public shared func getAllPosts() : async [Post] {
        return Iter.toArray(daoPosts.vals());
    };

    public shared func deletePost(postId : PostId) : async Result<Text, Text> {
        switch (daoPosts.get(postId)) {
            case (null) {
                return #err("Post does not exist");
            };
            case (?_post) {
                daoPosts.delete(postId);
                return #ok("Post deleted successfully");
            };
        };
    };

    public shared ({ caller }) func likePost(postId : PostId) : async Result<PostId, Text> {
        switch(daoPosts.get(postId)) {
            case(null) {
                return #err("No proposal found");
            };
            case(? post) {
                let newPost = _newPost(post, caller);
                daoPosts.put(postId, newPost);

                return #ok(postId);
            };

        };
    };

    public shared ({ caller }) func commentOnPost(content : Text, postId : PostId) : async Result<Text, Text> {
        if(Option.isNull(daoMembers.get(caller))) {
            return #err("You need to be a member to comment on this post");
        };
        switch(daoPosts.get(postId)) {
            case(null) {
                return #err("Post not found");
            };
            case(? post) {
                let newComment = {
                    created = Time.now();
                    author = caller;
                    content;
                };
                let coms = Buffer.fromArray<Comment>(post.comments);
                let _ = coms.add(newComment);

                let newPost = {
                    id = post.id;
                    author = post.author;
                    created = post.created;
                    content = post.content;
                    likes = post.likes;
                    comments = Buffer.toArray(coms);
                };
                daoPosts.put(newPost.id, newPost);
                return #ok(content);
            };
        };
    };

    // Error ocurrs when entering id that doesn't match to any comment
    public shared ({ caller }) func deleteCommentOnPost(commentId : Nat, postId : PostId) : async Result<Text, Text> {
        var message : Text = "";
        if(Option.isNull(daoMembers.get(caller))) {
            return #err("You need to be a member to create a proposal");
        };
        switch(daoPosts.get(postId)) {
            case(null) { 
                return #err("Post not found");
            };
            case(? post) {
                let newComments = Buffer.fromArray<Comment>(post.comments);
                if(newComments.get(commentId).author == caller) {
                    let _ = newComments.remove(commentId);
                    message := "Comment succesfully deleted";
                } else {
                    message := "You can't delete this comment";
                };

                let newPost = {
                    id = post.id;
                    author = post.author;
                    created = post.created;
                    content = post.content;
                    likes = post.likes;
                    comments = Buffer.toArray(newComments);
                };
                daoPosts.put(newPost.id, newPost);
                return #ok(message);
            };
        };
    };

    func _liked(post : Post, user : Principal) : Bool {
        for(like in post.likes.vals()) {
            if(like == user) {
                return true;
            };
        };
        return false;
    };

    func _newPost(post : Post, user : Principal) : Post {
        let newLikes = Buffer.fromArray<Principal>(post.likes);
        switch(Buffer.indexOf(user, newLikes, Principal.equal)) {
            case(null) { let _ = newLikes.add(user); };
            case(? inX) { let _ = newLikes.remove(inX) };
        };
        let newPost = {
            id = post.id;
            author = post.author;
            created = post.created;
            content = post.content;
            likes = Buffer.toArray(newLikes);
            comments = post.comments;
        };
        return newPost;
    };
    
    //            //
    //  DAO Misc  //
    //            //

    public query func daoBalance() : async Nat {
        return Cycles.balance();
    };

    func _burn(owner : Principal, amount : Nat) : () {
        let balance = Option.get(daoLedger.get(owner), 0);
        daoLedger.put(owner, balance - amount);
    };

};