'use strict';

class Node {
  constructor(component, props) {
    this.props = props;
    this.component = component;
    this.state = [];
    this.nodes = [];
  }

  replicate(otherNode) {
    this.state = otherNode.state;
    this.nodes = otherNode.nodes;
  }

  mount(parent) {
    this.parent = parent;
  }

  unmount() {
    this.parent = undefined;
  }

  getState(index) {
    return this.state[index];
  }

  setState(index, value) {
    this.state[index] = value;
  }
  
  getNode(index) {
    return this.nodes[index];
  }

  setNode(index, node) {
    this.nodes[index] = node;
  }

  clearNode(index) {
    this.nodes[index] = undefined;
  }

  clearNodes() {
    this.nodes = [];
  }

  forEachState(callback) {
    this.state.forEach((state, index) => callback(index, state));
  }

  forEachNode(callback) {
    this.nodes.forEach((node, index) => callback(index, node));
  }
}

function toEquatable(node) {
  if (node.props) {
    const children = node.props.children;
  
    const equatableProps = {
    };
  
    if (children) {
      equatableProps.children = children.map(toEquatable);
    }
  
    const keys = Object.keys(node.props);
  
    for (let i = 0; i < keys.length; i += 1) {
      if (node.props[keys[i]] instanceof Node) {
        equatableProps[keys[i]] = toEquatable(keys[i]);
      }
    }
    return {
      component: node.component,
      props: equatableProps,
    }
  }

  return {
    component: node.component,
  };
};

exports.Node = Node;
exports.toEquatable = toEquatable;