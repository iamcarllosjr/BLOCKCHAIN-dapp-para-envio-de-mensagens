//SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract sendMessage {
  address public owner;

  struct Memo {
    string name;
    string message;
    uint256 timestamp;
    address from;
  }

  Memo[] memos;

  constructor() {
    owner = msg.sender;
  }

  function messages(string calldata name, string calldata message) public {
    //Adicionando valores dentro da struct Memo, pelo array nomeado memos = memos.push(nameStruct(valores e parametros))
    memos.push(Memo(name, message, block.timestamp, msg.sender));
  }

  //Função retornará o array da struct Memo em memória
  function getMemos() public view returns (Memo[] memory) {
    return memos; //retornando o array memos
  }
}
