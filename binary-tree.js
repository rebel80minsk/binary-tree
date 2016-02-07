'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		var newNode = new Node (data); 

		var currentNode = this.root;

		if ( currentNode === null ) {
			this.root = newNode;
		} else {
			while ( true ){
				if ( data < currentNode.data ) {
					if ( currentNode.left === null ){
						currentNode.left = newNode;
						break;
					} else {
						currentNode = currentNode.left;
					}
				} else if ( data > currentNode.data ) {
					if ( currentNode.right === null ){
						currentNode.right = newNode;
						break;
					} else {
						currentNode = currentNode.right;
					}
				} else {
					//console.log( "Node with value " + data + " exists.");
					break;
				}
			}
		};
	}

	contains(data) {
		var isNodeFound = false;
		var currentNode = this.root;

		while ( currentNode )
		{
			if ( data < currentNode.data ) {
				currentNode = currentNode.left;
			} else if ( data > currentNode.data ) {
				currentNode = currentNode.right;
			} else {
				isNodeFound = true;
				break;
			}
		}
		return isNodeFound;
	}

	remove(data) {
		var nodeIsFound = false;
		var currentNode = this.root;
		var parentNode = null;
		var childCnt = 0;
        var minRightNode;
        var minRightNodeParent;
        //var replacementParent;

		while (!nodeIsFound && currentNode){
		    if ( data < currentNode.data ) {
		    	parentNode = currentNode;
		    	currentNode = currentNode.left;
			} else if ( data > currentNode.data ) {
				parentNode = currentNode;
				currentNode = currentNode.right;
			} else {
				nodeIsFound = true;
			}
		}

		if ( nodeIsFound ){
			if (currentNode.left === null && currentNode.right === null) {
				childCnt = 0;	
			} else if ( currentNode.left !== null && currentNode.right !== null ){
				childCnt = 2; 
			} else {
				childCnt = 1;
			}

			switch (childCnt){
				case 0:
					if ( currentNode === this.root ){
						this.root = null;
					} else {
						if ( currentNode.data < parentNode.data ) {
							parentNode.left = null;
						} else {
							parentNode.right = null;
						}
					}	
					break;
				case 1:
 					if ( currentNode === this.root ){
						if ( currentNode.right !== null ){
							this.root = currentNode.right;
						} else {
							this.root = currentNode.left;
						}						
					} else {
						if ( currentNode.data < parentNode.data ){
							if ( currentNode.right !== null ){
								parentNode.left = currentNode.right;
							} else {
								parentNode.left = currentNode.left;
							}
						} else {
							if ( currentNode.right !== null ){
								parentNode.right = currentNode.right;
							} else {
								parentNode.right = currentNode.left;
							}
						}
					}	
					break;	
				case 2:
					minRightNode = currentNode.right; //take right child
					minRightNodeParent = currentNode;

					while (minRightNode.left !== null){ //find minimum node begin from right child
						minRightNodeParent = minRightNode;
						minRightNode = minRightNode.left;
					}

					if ( minRightNodeParent !== currentNode ){
						minRightNodeParent.left = minRightNode.right; //update parent of found minimum node with right node of minimum	
						minRightNode.right = currentNode.right;
				    }
				    minRightNode.left = currentNode.left; //copy links in current node to the found minimum node before replacement


					if ( currentNode === this.root )
					{
						this.root = minRightNode;
					} else {
						if ( currentNode.data < parentNode.data ) { //replace link of current node with link to new node 
							parentNode.left = minRightNode;
						} else {
							parentNode.right = minRightNode;
						}
					}				
			}
		}
	}

	lookupTree(func){
		var treeLength = 0;

		function processNode (node) {
			if ( node ){
				//console.log(node.data);

				if ( node.left !== null ){
					processNode(node.left);
				}
				
				if ( node.right !== null ){
					processNode(node.right);
				}

				func.call();
		   }	
		}

		processNode(this.root);	
	}

	size() {
		var length = 0;
		
		this.lookupTree(function(){ length++ });
		
		return length;
	}

	isEmpty() {
		if ( this.root === null)
		{
			return true;
		} else {
			return false;
		}
	}
}
