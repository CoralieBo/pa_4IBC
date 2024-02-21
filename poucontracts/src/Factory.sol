// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;


import "./Pools.sol";

contract PouFactory {
    struct InfosPool {
        ERC20 tokenA;
        ERC20 tokenB;
    }

    address[] admins;
    mapping (address => InfosPool) public pools;
    address[] pairsAddresses;

    event NewPoolCreated(address poolAddress);

    constructor(){
        admins.push(msg.sender);
    }

    modifier onlyAdmin(){
        uint size = admins.length;
        bool isAdmin = false;
        for(uint i = 0; i < size; i++){
            if(admins[i] == msg.sender){
                isAdmin = true;
            }
            break;
        }
        require(isAdmin, "You are not admin");
        _;
    }

    function createPool(address _addressA, address _addressB, uint256 _amountA, uint256 _amountB) external {
        ERC20 _tokenA = ERC20(_addressA);
        ERC20 _tokenB = ERC20(_addressB);

        require(!existPair(_tokenA, _tokenB), "Pool already exist");
        require(_tokenA.allowance(msg.sender, address(this)) >= _amountA * 10 ** _tokenA.decimals(), "no allowance for tokenA");
        require(_tokenB.allowance(msg.sender, address(this)) >= _amountB * 10 ** _tokenB.decimals(), "no allowance for tokenB");

        PouPools newPool = new PouPools(_tokenA, _tokenB, _amountA, _amountB);
        _tokenA.transferFrom(msg.sender, address(newPool), _amountA);
        _tokenB.transferFrom(msg.sender, address(newPool), _amountB);

        pools[address(newPool)] = InfosPool(_tokenA, _tokenB);
        pairsAddresses.push(address(newPool));
        emit NewPoolCreated(address(newPool));
    }

    function test(address _addressA) view public returns(uint256){
        ERC20 _tokenA = ERC20(_addressA);
        return _tokenA.allowance(msg.sender, address(this));
    }

    function existPair(ERC20 _tokenA, ERC20 _tokenB) view internal returns(bool) {
        uint pairsLenght = pairsAddresses.length;
        for (uint i = 0; i < pairsLenght; i++){
            address pairsAddress = pairsAddresses[i];
            if(pools[pairsAddress].tokenA == _tokenA && pools[pairsAddress].tokenB == _tokenB){
                return true;
            }
            if(pools[pairsAddress].tokenA == _tokenB && pools[pairsAddress].tokenB == _tokenA){
                return true;
            }
        }
        return false;
    }

    function getPairsAddresses() view public returns(address[] memory){
        return pairsAddresses;
    }

    function getPairsAddress(uint _pairIndex) view public returns(address){
        return pairsAddresses[_pairIndex];
    }
}
