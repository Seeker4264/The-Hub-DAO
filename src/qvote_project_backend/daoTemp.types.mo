import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";

module {

    public type Result<Ok, Err> = Result.Result<Ok, Err>;
    public type HashMap<Ok, Err> = HashMap.HashMap<Ok, Err>;

    // Members

    public type Member = {
        principal : Principal;
        name : Text;
        age : Nat;
    };

    // Proposals

    public type ProposalId = Nat64;
    public type ProposalContent = {
        #ChangeManifesto : Text;
        #AddGoal : Text;
    };

    public type ProposalStatus = {
        #Open;
        #Accepted;
        #Rejected;
    };

    public type Vote = {
        member : Principal;
        votingPower : Nat;
        yesOrNo : Bool;
    };

    public type Proposal = {
        id : Nat64;
        content : ProposalContent;
        creator : Principal;
        created : Time.Time;
        executed : ?Time.Time;
        votes : [Vote];
        voteScore : Int;
        status : ProposalStatus;
    };

    // Posts & Comments

    public type Comment = {
        comDate : Text;
        comDesc : Text;
    };

    public type Post = {
        postDate : Text;
        postTitle : Text;
        postDesc : Text;
        postComments : HashMap<Principal, Comment>;
    };

};