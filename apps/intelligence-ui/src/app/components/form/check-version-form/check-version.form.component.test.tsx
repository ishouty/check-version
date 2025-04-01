import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckVersionForm from './check-version.form.component';
import usbService from '../../../services/usb-service/check-version.service';
import '@testing-library/jest-dom';

jest.mock('../../../services/usb-service/check-version.service', () => ({
  checkVersionRequest: jest.fn(),
}));

global.alert = jest.fn();

describe('CheckVersionForm', () => {
  it('check if the form renders', () => {
    render(<CheckVersionForm />);

    expect(screen.getByText(/Check USB/)).toBeInTheDocument();
    expect(screen.getByTestId('version-input')).toBeInTheDocument();
    expect(screen.getByText(/Check Version/)).toBeInTheDocument();
  });
  it('submits the form and checks version correctly', async () => {
    // Mocking the latest version returned from the service
    (usbService.checkVersionRequest as jest.Mock).mockResolvedValue('1.2.3');

    render(<CheckVersionForm />);

    // Find the input field and enter a version
    const input = screen.getByTestId('version-input');
    fireEvent.change(input, { target: { value: '1.2.4' } });

    // Find the submit button and click it
    const submitButton = screen.getByRole('button', { name: /Check Version/i });
    fireEvent.click(submitButton);

    // Wait for the async call to complete
    await waitFor(() =>
      expect(usbService.checkVersionRequest).toHaveBeenCalled()
    );

    // Expect alert to be called with the correct message
    await waitFor(() =>
      expect(global.alert).toHaveBeenCalledWith('you are up to date')
    );
  });

  it('shows an alert when the version is outdated', async () => {
    // Mock an outdated version scenario
    (usbService.checkVersionRequest as jest.Mock).mockResolvedValue('1.2.5');

    render(<CheckVersionForm />);

    expect(screen.getByText(/Check USB/)).toBeInTheDocument();

    // Enter a version lower than the latest
    fireEvent.change(screen.getByTestId('version-input'), {
      target: { value: '1.2.3' },
    });

    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /Check Version/i }));

    // Ensure the checkVersion service was called
    await waitFor(() =>
      expect(usbService.checkVersionRequest).toHaveBeenCalled()
    );

    // Expect an alert that informs the user their version is outdated
    await waitFor(() =>
      expect(global.alert).toHaveBeenCalledWith('you are not up to date')
    );
  });
});
