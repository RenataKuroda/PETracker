import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from "vitest"
import { AddReminder } from './AddReminder';

it('should render the AddReminder component', async () => {
    await userEvent.setup()
    const addReminder = vi.fn();
    const fetchReminders = vi.fn();
    render(<AddReminder pet_id={'1'} user_id={'user'} fetchReminders={fetchReminders} addReminder={addReminder} />)

    // Initial state
    const dueDateInput = screen.getByPlaceholderText('Due Date');
    const taskInput = screen.getByPlaceholderText('Task');

    expect(dueDateInput).toBeInTheDocument();
    expect(taskInput).toBeInTheDocument();

    // Enter values
    await userEvent.type(dueDateInput, '2021-10-10');
    await userEvent.type(taskInput, 'Feed the dog');

    expect(dueDateInput).toHaveValue('2021-10-10');
    expect(taskInput).toHaveValue('Feed the dog');

    // Submit
    await userEvent.click(screen.getByText('Add Reminder'));

    // Calls the methods
    expect(addReminder).toHaveBeenCalledWith({
        user_id: 'user',
        pet_id: '1',
        due_date: '2021-10-10',
        task: 'Feed the dog',
    });
    expect(fetchReminders).toHaveBeenCalled();

    // Clear components
    expect(dueDateInput).toHaveValue('');
    expect(taskInput).toHaveValue('');
})