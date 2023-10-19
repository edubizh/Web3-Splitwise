pragma solidity ^0.8.20;

contract Rio {

    uint256 id = 0;

    struct PaymentRequest {
        address payee; //person to be paid
        Debtor[] debtors; //people to pay owed funds
        uint256 cost;
    }

    struct Debtor {
        address debtorAddress;
        bool paid;
        bool paymentRetrieved;
    }

    mapping(address=>uint256[]) public addressIds; 
    mapping(uint256=>PaymentRequest) public paymentRequests;

    function isDebtor(uint256 paymentRequestId) view public returns (uint) {
        
        for(uint i = 0; i < paymentRequests[paymentRequestId].debtors.length; i++) {
            if(paymentRequests[paymentRequestId].debtors[i].debtorAddress == msg.sender) {
                return i;
            }
        }
        
        revert("You are not a debtor in this paymentRequest");
    }

    function createPaymentRequest(address[] memory debtorAddresses, uint256 cost) external {
        require(cost > 0, "Invalid cost");
        require(debtorAddresses.length > 0, "Must have debtors");

        for(uint i = 0; i<debtorAddresses.length; i++) {

            paymentRequests[id].debtors.push(
                Debtor(
                    debtorAddresses[i],
                    false,
                    false
                )
            );

        }

        paymentRequests[id].payee = msg.sender;
        
        paymentRequests[id].cost = cost;

        addressIds[msg.sender].push(id);

        for(uint i = 0; i<debtorAddresses.length; i++) {
            
            addressIds[debtorAddresses[i]].push(id);
        }

        id++;
    }

    function makePayment(uint256 paymentRequestId) external payable {
        uint placeInArray = isDebtor(paymentRequestId);

        //one is added in the denominator to divide cost between debtors AND payee
        uint256 payment = paymentRequests[paymentRequestId].cost / (paymentRequests[paymentRequestId].debtors.length + 1);

        require(msg.value == payment, "Incorrect value sent in transaction");

        paymentRequests[paymentRequestId].debtors[placeInArray].paid = true;
        
    }

    function receivePayment(uint256 paymentRequestId) external {

        //one is added in the denominator to divide cost between debtors AND payee
        uint256 payment = paymentRequests[paymentRequestId].cost / (paymentRequests[paymentRequestId].debtors.length+1);

        uint256 toPayPayee = 0; 
        for (uint i = 0; i < paymentRequests[paymentRequestId].debtors.length; i++) {
            if (paymentRequests[paymentRequestId].debtors[i].paid == true &&
                paymentRequests[paymentRequestId].debtors[i].paymentRetrieved == false) {
                    toPayPayee += payment;
                    paymentRequests[paymentRequestId].debtors[i].paymentRetrieved = true;
                }
        }

        address payable payee = payable(paymentRequests[paymentRequestId].payee);

        payee.transfer(toPayPayee); //transfer function should auto revert on failure
    }

    function getAddresIds(address addr) view external returns (uint256[] memory) {
        return addressIds[addr];
    }

    function seePayment(uint256 paymentRequestId) view external returns (uint256) {
        //one is added in the denominator to divide cost between debtors AND payee
        uint256 payment = paymentRequests[paymentRequestId].cost / (paymentRequests[paymentRequestId].debtors.length+1);
        return payment;
    }

}