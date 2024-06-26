// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./VsToken.sol";

contract VsTokenSale {

address owner;

VsToken public tokenContract;
uint256 public tokensSold;

uint256 public tokenPrice;

     event Sell(address _buyer, uint256 _amount);

    constructor( VsToken _tokenContract, uint256 _tokenPrice) {
        owner = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

     function buyTokens(uint256 _numberOfTokens) public payable {

        require(msg.value == _multiply(_numberOfTokens, tokenPrice), "msg.value not correct");

        require(tokenContract.balanceOf(address(tokenContract)) >= _numberOfTokens, "not enough tokens on contract balance");
        
        require(tokenContract.transferFrom(address(tokenContract), msg.sender, _numberOfTokens), "transaction not completed");

        tokensSold += _numberOfTokens;
         emit Sell(msg.sender, _numberOfTokens);
    }

     function _multiply(uint x, uint y) internal pure returns(uint z){
        require(y == 0 || (z = x * y) / y == x);
    }
}
