import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Types "daoTemp.types";

actor class DAO(name : Text, manifesto : Text) {
    
    type Member = Types.Member;
    type HashMap<K, V> = Types.HashMap<K, V>;
    type Result<Ok, Err> = Types.Result<Ok, Err>;


    let daoName : Text = name;
    var daoManifesto : Text = manifesto;

    let daoMembers = HashMap.HashMap<Principal, Member>(0, Principal.equal, Principal.hash);
    let daoLedger = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);

    let daoPosts = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);

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

    //                       //
    //  DAO members methods  //
    //                       //

    public shared ({ caller }) func addMember(member : Member) : async Result<(), Text> {
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

    public shared ({ caller }) func updateMember(member : Member) : async Result<(), Text> {
        switch (daoMembers.get(caller)) {
            case (null) {
                return #err("Member does not exist");
            };
            case (?member) {
                daoMembers.put(caller, member);
                return #ok();
            };
        };
    };

    public shared ({ caller }) func removeMember() : async Result<(), Text> {
        switch (daoMembers.get(caller)) {
            case (null) {
                return #err("Member does not exist");
            };
            case (?member) {
                daoMembers.delete(caller);
                return #ok();
            };
        };
    };

    public query func getMember(p : Principal) : async Result<Member, Text> {
        switch (daoMembers.get(p)) {
            case (null) {
                return #err("Member does not exist");
            };
            case (?member) {
                return #ok(member);
            };
        };
    };

    public query func getMembers() : async [Member] {
        let newArray = Buffer.Buffer<Member>(5);

        for ((key, value) in daoMembers.entries()) {
            newArray.add(value);
        };

        return Buffer.toArray(newArray);
    };

};