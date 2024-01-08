import { render, screen } from '@/utils/test-utils';
import TestComponent from './component';

describe('TestComponent', async () => {
  it('should render the test component', () => {
    render(<TestComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
