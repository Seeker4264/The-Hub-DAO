import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";

module {

    public type Result<Ok, Err> = Result.Result<Ok, Err>;
    public type HashMap<Ok, Err> = HashMap.HashMap<Ok, Err>;

    public type Member = {
        principal : Principal;
        name : Text;
        age : Nat;
    };

    public type Comment = {
        comDate : Text;
        comDesc : Text;
    };

    public type Post = {
        postDate : Text;
        postTitle : Text;
        postDesc : Text;
        postComments : HashMap<Principal, Comment>; // Not sure if it is like this
    };

};