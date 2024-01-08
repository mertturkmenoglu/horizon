import { fireEvent, render, screen } from '@/utils/test-utils';
import ActionItem, { Props } from './ActionItem';

describe('ActionItem', async () => {
  let props: Props;

  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing
      }
      unobserve() {
        // do nothing
      }
      disconnect() {
        // do nothing
      }
    };
  });

  beforeEach(() => {
    props = {
      children: <></>,
      text: 'Lorem ipsum',
      className: 'lorem-ipsum',
    };
  });

  it('Should render the component', () => {
    const component = render(<ActionItem {...props} />);
    expect(component.container).toBeInTheDocument();
  });

  it('Should render the passed children', () => {
    const testId = 'action-item-children';
    props.children = <div data-testid={testId}>Props Children</div>;
    const component = render(<ActionItem {...props} />);
    const child = component.getByTestId(testId);
    expect(child).toBeInTheDocument();
  });

  it('Should render the tooltip content when hovered', async () => {
    props.children = <div>Props children</div>;
    render(<ActionItem {...props} />);
    fireEvent.focus(screen.getByText('Props children'));
    const tooltip = await screen.findByTestId(
      'tooltip-content',
      {},
      {
        timeout: 1000,
      }
    );

    expect(tooltip).toBeInTheDocument();
  });
});
