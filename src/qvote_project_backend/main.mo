import Buffer "mo:base/Buffer";
// import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
// import Option "mo:base/Option";
// import Array "mo:base/Array";
import Text "mo:base/Text";
import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Prim "mo:prim";

import Types "daoTemp.types";
import daoTemplate "daoTemp";

actor {

    type Result<Ok, Err> = Types.Result<Ok, Err>;

    type indDao = daoTemplate.DAO;
    type Member = Types.Member;
    type Proposal = Types.Proposal;
    type ProposalId = Types.ProposalId;
    type ProposalStatus = Types.ProposalStatus;
    type ProposalContent = Types.ProposalContent;
    type PostId = Types.PostId;
    type PostContent = Types.PostContent;
    type Post = Types.Post;
    type Comment = Types.Comment;

    stable var daoList_store : [indDao] = [];
    let daoList = Buffer.Buffer<indDao>(5);

    // Classes

    class ParsedDAO(dName : Text, dManifesto : Text) = {
        public let name = dName;
        public let manifesto = dManifesto;
    };

    //              //
    //  Create DAO  //
    //              //

    public func createDao(daoName : Text, daoManifesto : Text, daoTkName : Text, daoTkSymbol : Text) : async Text {

        Cycles.add<system>(500_000_000_000); // Pass cycles for the Dao creation


        let lowercased = Text.map(daoName, Prim.charToLower);

        let dao : indDao = await daoTemplate.DAO(lowercased, daoManifesto, daoTkName, daoTkSymbol, credit, 5_000_000_000);
        daoList.add(dao);
        return lowercased # " created successfully";
    };

    //              //
    //  Delete DAO  //
    //              //

    public func deleteDao(daoName : Text) : async Result<Text, Text> {     
        for (i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            if (naming == daoName) {
                var message : Text = "";
                let x = await daoList.get(i).daoBalance();
                let amount : Nat = x - 8_000_000_000;
                try {
                    await daoList.get(i).withdraw(amount);
                    message := "Cycles claimed";
                } catch(_e) {
                    message := "Cycles couldn't be claimed";
                };
                let _ = daoList.remove(i);
                return #ok("DAO deleted successfully | " # message);
            };
        };

        return #err("DAO doesn't exist");
    };

    public func resetBuffer() : async () {
        daoList.clear();
        return;
    };

    //           //
    //  Get DAO  //
    //           //

    public shared query func getDaos() : async [indDao] {
        return Buffer.toArray(daoList);
    };

    public shared func getDaoNameByInd(i : Nat) : async Text {
        let dao = daoList.get(i);
        return await dao.getName();
    };

    public shared func getDaoByName(name : Text) : async ?indDao {
        for (i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            if (naming == name) {
                return ?dao;
            };
        };

        return null;
    };

    public shared func getDaoInX(name : Text) : async ?Nat {
        for (i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            if (naming == name) {
                return ?i;
            };
        };

        return null;
    };

    public shared func getDaosNames() : async [Text] {
        let listing = Buffer.Buffer<Text>(5);

        for(i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            listing.add(naming);
        };

        return Buffer.toArray(listing);
    };

    public shared func getDaosManifestos() : async [Text] {
        let listing = Buffer.Buffer<Text>(5);

        for(i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let manifest = await dao.getManifesto();
            listing.add(manifest);
        };

        return Buffer.toArray(listing);
    };

    public shared func getSearchDaos() : async [ParsedDAO] {
        let listing = Buffer.Buffer<ParsedDAO>(5);

        for(i in Iter.range(0, daoList.size() - 1)) {
            let dao = daoList.get(i);
            let naming = await dao.getName();
            let manifest = await dao.getManifesto();
            let parsedDao = ParsedDAO(naming, manifest);
            listing.add(parsedDao);
        };

        return Buffer.toArray(listing);
    };

    //                //
    //  DAO specific  //
    //                //

    // Balance

    public func daoCyclesBalance(daoName : Text) : async Result<Nat, Text> {
        let dao = await getDaoByName(daoName);

        switch (dao) {
            case (null) {
                return #err("DAO doesn't exist");
            };
            case (?indDao) {
                return #ok(await indDao.daoBalance());
            };
        };
    };

    // Call func in dao

    public shared func getDaoName(canisterId: Text) : async Text {
        let canister = actor(canisterId): actor { getName: () -> async Text };
        return await canister.getName();
    };

    public shared func getDaoManifesto(canisterId: Text) : async Text {
        let canister = actor(canisterId): actor { getManifesto: () -> async Text };
        return await canister.getManifesto();
    };

    public shared func setDaoManifesto(canisterId: Text, newManifesto : Text) : async () {
        let canister = actor(canisterId): actor { setManifesto: (Text) -> async () };
        return await canister.setManifesto(newManifesto);
    };

    public shared func getDaoGoals(canisterId: Text) : async [Text] {
        let canister = actor(canisterId): actor { getGoals: () -> async [Text] };
        return await canister.getGoals();
    };

    public shared func addDaoGoal(canisterId: Text, newGoal : Text) : async () {
        let canister = actor(canisterId): actor { addGoal: (Text) -> async () };
        return await canister.addGoal(newGoal);
    };



    public shared ({ caller }) func addDaoMember(canisterId: Text, name : Text, age : Nat) : async Result<(), Text> {
        let canister = actor(canisterId): actor { addMember: (Principal, Text, Nat) -> async Result<(), Text> };
        return await canister.addMember(caller, name, age);
    };

    public shared ({ caller }) func updateDaoMember(canisterId: Text, name : Text, age : Nat) : async Result<(), Text> {
        let canister = actor(canisterId): actor { updateMember: (Principal, Text, Nat) -> async Result<(), Text> };
        return await canister.updateMember(caller, name, age);
    };

    public shared ({ caller }) func removeDaoMember(canisterId: Text) : async Result<(), Text> {
        let canister = actor(canisterId): actor { removeMember: (Principal) -> async Result<(), Text> };
        return await canister.removeMember(caller);
    };

    public shared func getDaoMember(canisterId: Text, userId : Principal) : async Result<Member, Text> {
        let canister = actor(canisterId): actor { getMember: (Principal) -> async Result<Member, Text> };
        return await canister.getMember(userId);
    };

    public shared func getAllDaoMembers(canisterId: Text) : async [Member] {
        let canister = actor(canisterId): actor { getAllMembers: () -> async [Member] };
        return await canister.getAllMembers();
    };



    public shared func getDaoProposal(canisterId: Text, proposalId : ProposalId) : async ?Proposal {
        let canister = actor(canisterId): actor { getProposal: (ProposalId) -> async ?Proposal };
        return await canister.getProposal(proposalId);
    };

    public shared func getAllDaoProposal(canisterId: Text) : async [Proposal] {
        let canister = actor(canisterId): actor { getAllProposal: () -> async [Proposal] };
        return await canister.getAllProposal();
    };

    public shared ({ caller }) func createDaoProposal(canisterId: Text, content : ProposalContent) : async Result<ProposalId, Text> {
        let canister = actor(canisterId): actor { createProposal: (Principal, ProposalContent) -> async Result<ProposalId, Text> };
        return await canister.createProposal(caller, content);
    };

    public shared ({ caller }) func voteDaoProposal(canisterId: Text, proposalId : ProposalId, yesOrNo : Bool) : async Result<(), Text> {
        let canister = actor(canisterId): actor { voteProposal: (Principal, ProposalId, Bool) -> async Result<(), Text> };
        return await canister.voteProposal(caller, proposalId, yesOrNo);
    };



    public shared func getDaoPost(canisterId: Text, postId : PostId) : async ?Post {
        let canister = actor(canisterId): actor { getPost: (PostId) -> async ?Post };
        return await canister.getPost(postId);
    };

    public shared func getAllDaoPosts(canisterId: Text) : async [Post] {
        let canister = actor(canisterId): actor { getAllPosts: () -> async [Post] };
        return await canister.getAllPosts();
    };

    public shared ({ caller }) func createDaoPost(canisterId: Text, content : PostContent) : async Result<Text, Text> {
        let canister = actor(canisterId): actor { createPost: (Principal, PostContent) -> async Result<Text, Text> };
        return await canister.createPost(caller, content);
    };
    
    public shared func deleteDaoPost(canisterId: Text, postId : PostId) : async Result<Text, Text> {
        let canister = actor(canisterId): actor { deletePost: (PostId) -> async Result<Text, Text> };
        return await canister.deletePost(postId);
    };

    public shared ({ caller }) func likeDaoPost(canisterId: Text, postId : PostId) : async Result<PostId, Text> {
        let canister = actor(canisterId): actor { likePost: (Principal, PostId) -> async Result<PostId, Text> };
        return await canister.likePost(caller, postId);
    };

    public shared ({ caller }) func commentDaoPost(canisterId: Text, content : Text, postId : PostId) : async Result<Text, Text> {
        let canister = actor(canisterId): actor { commentOnPost: (Principal, Text, PostId) -> async Result<Text, Text> };
        return await canister.commentOnPost(caller, content, postId);
    };



    //                       //
    //  Unrelated functions  //
    //                       //

    public func getDaoPrincipal(name : Text) : async Result<Text, Text> {
        let dao = await getDaoByName(name);

        switch(dao) {
            case (null) {
                return #err("DAO doesn't exist");
            };
            case (?indDao) {
                let prince = await indDao.get_principal();
                return #ok(Principal.toText(prince));
            };
        };
    };

    public query func mainDaoBalance() : async Nat {
        return Cycles.balance();
    };

    public func credit() : async () {
        let available = Cycles.available();
        let accepted = Cycles.accept<system>(available);
        assert (accepted == available);
    };

    public shared func withdrawFromDao() : async () {
        await daoList.get(0).withdraw(1_000_000);
        // assert (500_000 == (await daoList.get(0).getSavings()));
    };

    //                                  //
    //  Custom stable memory functions  //
    //                                  //

    system func preupgrade() {
        daoList_store := Iter.toArray(daoList.vals());
    };

    system func postupgrade() {
        daoList_store := [];
    };
};
