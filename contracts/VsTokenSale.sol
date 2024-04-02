// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./VsToken.sol";

contract VsTokenSale {
address admin;
VsToken public tokenContract;
uint256 public tokensSold;

uint256 public tokenPrice;

     event Sell(address _buyer, uint256 _amount);

    constructor( VsToken _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

     function buyTokens(uint256 _numberOfTokens) public payable {

        require(msg.value == _multiply(_numberOfTokens, tokenPrice));

        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        tokensSold += _numberOfTokens;
         emit Sell(msg.sender, _numberOfTokens);
    }

     function _multiply(uint x, uint y) internal pure returns(uint z){
        require(y == 0 || (z = x * y) / y == x);
    }

    function endSale() public {

        require(msg.sender == admin, 'Only Admin can end the sale');

        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        selfdestruct(payable(admin));

    }
}
