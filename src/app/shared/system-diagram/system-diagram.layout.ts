import { DiagramSpec, DiagramNode, DiagramEdge } from '../../data/models';

export interface LayoutNode {
  id: string;
  label: string;
  kind: DiagramNode['kind'];
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutEdge {
  fromId: string;
  toId: string;
  label?: string;
  direction?: 'forward' | 'return';
  path: string;
  labelX: number;
  labelY: number;
  arrowX: number;
  arrowY: number;
  arrowAngle: number;
}

export interface DiagramLayout {
  width: number;
  height: number;
  viewBox: string;
  nodes: LayoutNode[];
  edges: LayoutEdge[];
}

export function computeDiagramLayout(spec: DiagramSpec, isVertical: boolean): DiagramLayout {
  if (isVertical) {
    return computeVerticalLayout(spec);
  }
  return computeHorizontalLayout(spec);
}

function computeHorizontalLayout(spec: DiagramSpec): DiagramLayout {
  const nodeWidth = 180;
  const nodeHeight = 64;
  const gap = 52;
  const marginX = 40;
  const marginY = 70;

  const nodeCount = spec.nodes.length;
  const totalWidth = marginX * 2 + nodeCount * nodeWidth + (nodeCount - 1) * gap;
  const totalHeight = 220;
  const centerY = marginY + nodeHeight / 2;

  const nodesMap = new Map<string, LayoutNode>();
  const nodes: LayoutNode[] = spec.nodes.map((node, index) => {
    const x = marginX + index * (nodeWidth + gap);
    const y = marginY;
    const layoutNode: LayoutNode = {
      id: node.id,
      label: node.label,
      kind: node.kind,
      x,
      y,
      width: nodeWidth,
      height: nodeHeight
    };
    nodesMap.set(node.id, layoutNode);
    return layoutNode;
  });

  const edges: LayoutEdge[] = spec.edges.map((edge) => {
    const from = nodesMap.get(edge.from);
    const to = nodesMap.get(edge.to);

    if (!from || !to) {
      return {
        fromId: edge.from,
        toId: edge.to,
        path: '',
        labelX: 0,
        labelY: 0,
        arrowX: 0,
        arrowY: 0,
        arrowAngle: 0
      };
    }

    const isReturn = edge.direction === 'return';
    if (isReturn) {
      // Curve underneath or above
      const startX = from.x + from.width / 2;
      const startY = from.y + from.height;
      const endX = to.x + to.width / 2;
      const endY = to.y + to.height;
      const curveY = startY + 50;

      const path = `M ${startX} ${startY} C ${startX} ${curveY}, ${endX} ${curveY}, ${endX} ${endY}`;
      return {
        fromId: edge.from,
        toId: edge.to,
        label: edge.label,
        direction: 'return',
        path,
        labelX: (startX + endX) / 2,
        labelY: curveY + 14,
        arrowX: endX,
        arrowY: endY,
        arrowAngle: -90 // points upwards back to node
      };
    } else {
      // Direct forward connection
      const startX = from.x + from.width;
      const startY = from.y + from.height / 2;
      const endX = to.x;
      const endY = to.y + to.height / 2;

      const path = `M ${startX} ${startY} L ${endX} ${endY}`;
      return {
        fromId: edge.from,
        toId: edge.to,
        label: edge.label,
        direction: 'forward',
        path,
        labelX: (startX + endX) / 2,
        labelY: startY - 10,
        arrowX: endX,
        arrowY: endY,
        arrowAngle: 0 // points right
      };
    }
  });

  return {
    width: totalWidth,
    height: totalHeight,
    viewBox: `0 0 ${totalWidth} ${totalHeight}`,
    nodes,
    edges
  };
}

function computeVerticalLayout(spec: DiagramSpec): DiagramLayout {
  const nodeWidth = 260;
  const nodeHeight = 56;
  const gap = 44;
  const marginX = 30;
  const marginY = 30;
  const returnGutter = 45;

  const nodeCount = spec.nodes.length;
  const totalWidth = marginX + nodeWidth + returnGutter + marginX;
  const totalHeight = marginY * 2 + nodeCount * nodeHeight + (nodeCount - 1) * gap;

  const nodesMap = new Map<string, LayoutNode>();
  const nodes: LayoutNode[] = spec.nodes.map((node, index) => {
    const x = marginX;
    const y = marginY + index * (nodeHeight + gap);
    const layoutNode: LayoutNode = {
      id: node.id,
      label: node.label,
      kind: node.kind,
      x,
      y,
      width: nodeWidth,
      height: nodeHeight
    };
    nodesMap.set(node.id, layoutNode);
    return layoutNode;
  });

  const edges: LayoutEdge[] = spec.edges.map((edge) => {
    const from = nodesMap.get(edge.from);
    const to = nodesMap.get(edge.to);

    if (!from || !to) {
      return {
        fromId: edge.from,
        toId: edge.to,
        path: '',
        labelX: 0,
        labelY: 0,
        arrowX: 0,
        arrowY: 0,
        arrowAngle: 0
      };
    }

    const isReturn = edge.direction === 'return';
    if (isReturn) {
      // Loop along right edge
      const startX = from.x + from.width;
      const startY = from.y + from.height / 2;
      const endX = to.x + to.width;
      const endY = to.y + to.height / 2;
      const loopX = startX + 32;

      const path = `M ${startX} ${startY} L ${loopX} ${startY} L ${loopX} ${endY} L ${endX} ${endY}`;
      return {
        fromId: edge.from,
        toId: edge.to,
        label: edge.label,
        direction: 'return',
        path,
        labelX: loopX + 8,
        labelY: (startY + endY) / 2,
        arrowX: endX,
        arrowY: endY,
        arrowAngle: 180 // points left towards node
      };
    } else {
      // Straight downward edge
      const startX = from.x + from.width / 2;
      const startY = from.y + from.height;
      const endX = to.x + to.width / 2;
      const endY = to.y;

      const path = `M ${startX} ${startY} L ${endX} ${endY}`;
      return {
        fromId: edge.from,
        toId: edge.to,
        label: edge.label,
        direction: 'forward',
        path,
        labelX: startX,
        labelY: (startY + endY) / 2 - 4,
        arrowX: endX,
        arrowY: endY,
        arrowAngle: 90 // points downwards
      };
    }
  });

  return {
    width: totalWidth,
    height: totalHeight,
    viewBox: `0 0 ${totalWidth} ${totalHeight}`,
    nodes,
    edges
  };
}
