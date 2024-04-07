// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "./IFactory.sol";

contract PouPools {
    ERC20 tokenA;
    ERC20 tokenB;
    uint public k; // Constant used to calculate the price (tokenA * tokenB = k)
    IPouFactory factory;

    constructor(ERC20 _tokenA, ERC20 _tokenB, address _factory){
        tokenA = _tokenA;
        tokenB = _tokenB;
        factory = IPouFactory(_factory);
    }

    function initPool(uint256 _amountA, uint256 _amountB) external {
        require(k == 0, "Pool already initialized");
        k = _amountA * _amountB;
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transferFrom(msg.sender, address(this), _amountB);
    }

    function addLiquidity(uint256 _amountA, uint256 _amountB) public { // Pour calculer en front combien envoyé de B il faut faire : B = k / A
        require(_amountA * _amountB == k, "The ratio is bad");
        require(tokenA.allowance(msg.sender, address(this)) >= _amountA, "no allowance for tokenA");
        require(tokenB.allowance(msg.sender, address(this)) >= _amountB, "no allowance for tokenB");
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transferFrom(msg.sender, address(this), _amountB);
    }

    function swapAforB(uint256 _amountA) external {
        require(tokenA.allowance(msg.sender, address(this)) >= _amountA, "no allowance for tokenA");
        uint256 _amountB = getExactTokenB(_amountA);
        uint256 fees = factory.getFees();
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transfer(msg.sender, _amountB * (100 - fees) / 100); // On envoie 100% - fees%
        tokenB.transfer(address(factory), _amountB * fees / 100); // On envoie les fees à la factory
    }

    function swapBforA(uint256 _amountB) external {
        require(tokenB.allowance(msg.sender, address(this)) >= _amountB, "no allowance for tokenB");
        uint256 _amountA = getExactTokenA(_amountB);
        uint256 fees = factory.getFees();
        tokenB.transferFrom(msg.sender, address(this), _amountB);
        tokenA.transfer(msg.sender, _amountA * (100 - fees) / 100); // On envoie 100% - fees%
        tokenA.transfer(address(factory), _amountA * fees / 100); // On envoie les fees à la factory
    }

    function getExactTokenA(uint256 _amountB) view public returns(uint256 _amountA) {
        uint256 newSupplyA = k / (_amountB + getSupplyB());
        return getSupplyA() - newSupplyA;
    }

    function getExactTokenB(uint256 _amountA) view public returns(uint256 _amountB) {
        uint256 newSupplyB = k / (_amountA + getSupplyA());
        return getSupplyB() - newSupplyB;
    }

    function getRateAforB() view external returns(uint256) { // Pour chaque A on a xB
        return tokenB.balanceOf(address(this)) * 10 ** tokenA.decimals() / tokenA.balanceOf(address(this));
    }

    function getRateBforA() view external returns(uint256) { // Pour chaque B on a xA
        return tokenA.balanceOf(address(this)) * 10 ** tokenB.decimals() / tokenB.balanceOf(address(this));
    }

    function getSupplyA() view public returns(uint256) {
        return tokenA.balanceOf(address(this));
    }

    function getSupplyB() view public returns(uint256) {
        return tokenB.balanceOf(address(this));
    }
}