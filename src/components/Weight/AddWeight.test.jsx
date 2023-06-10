import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from "vitest"
import { AddWeight } from './AddWeight'

it('should render the AddWeight component', async () => {
    await userEvent.setup()
    const addWeight = vi.fn();
    const fetchWeightHistory = vi.fn();
    render(<AddWeight pet_id={'1'} fetchWeightHistory={fetchWeightHistory} addWeight={addWeight} />)

    const weightInput = screen.getByPlaceholderText('Enter weight');

    expect(weightInput).toBeInTheDocument();

    await userEvent.type(weightInput, '17.5');

    expect(weightInput).toHaveValue(17.5);

    await userEvent.click(screen.getByText('Add Weight'));

    expect(addWeight).toHaveBeenCalledWith({
        pet_id: '1',
        weight: 17.5,
        date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
    });
    expect(fetchWeightHistory).toHaveBeenCalled();
   
    expect(weightInput).toHaveValue(null);
})