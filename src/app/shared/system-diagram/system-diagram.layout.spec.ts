import { computeDiagramLayout } from './system-diagram.layout';
import { DiagramSpec } from '../../data/models';

describe('SystemDiagram Layout Algorithm', () => {
  const mockSpec: DiagramSpec = {
    nodes: [
      { id: 'client', label: 'User Interface', kind: 'client' },
      { id: 'service', label: 'Backend Service', kind: 'service' },
      { id: 'db', label: 'Database', kind: 'store' }
    ],
    edges: [
      { from: 'client', to: 'service', label: 'Submit Request', direction: 'forward' },
      { from: 'service', to: 'db', label: 'Save Record', direction: 'forward' },
      { from: 'service', to: 'client', label: 'Response', direction: 'return' }
    ],
    caption: 'Test Architecture Diagram',
    altText: 'A test system architecture flow'
  };

  it('should compute horizontal layout on wide screens', () => {
    const layout = computeDiagramLayout(mockSpec, false);

    expect(layout.nodes.length).toBe(3);
    expect(layout.edges.length).toBe(3);
    expect(layout.viewBox).toContain('0 0');
    expect(layout.width).toBeGreaterThan(500);

    // Nodes should be ordered horizontally: x strictly increases
    expect(layout.nodes[0]!.x).toBeLessThan(layout.nodes[1]!.x);
    expect(layout.nodes[1]!.x).toBeLessThan(layout.nodes[2]!.x);

    // All horizontal nodes share the same y position
    expect(layout.nodes[0]!.y).toBe(layout.nodes[1]!.y);
  });

  it('should compute vertical layout on narrow screens', () => {
    const layout = computeDiagramLayout(mockSpec, true);

    expect(layout.nodes.length).toBe(3);
    expect(layout.edges.length).toBe(3);

    // Nodes should be ordered vertically: y strictly increases
    expect(layout.nodes[0]!.y).toBeLessThan(layout.nodes[1]!.y);
    expect(layout.nodes[1]!.y).toBeLessThan(layout.nodes[2]!.y);

    // All vertical nodes share the same x margin
    expect(layout.nodes[0]!.x).toBe(layout.nodes[1]!.x);
  });

  it('should generate valid SVG path strings for edges', () => {
    const layout = computeDiagramLayout(mockSpec, false);

    const forwardEdge = layout.edges.find(e => e.direction === 'forward');
    expect(forwardEdge).toBeDefined();
    expect(forwardEdge?.path).toMatch(/^M \d+(\.\d+)? \d+(\.\d+)? L \d+(\.\d+)? \d+(\.\d+)?$/);

    const returnEdge = layout.edges.find(e => e.direction === 'return');
    expect(returnEdge).toBeDefined();
    expect(returnEdge?.path).toContain('C'); // Cubic bezier curve for return edge
  });
});
