import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { DataProvider, useData } from './DataContext';

function TestComponent() {
  const { studentStats, upcomingMeal, confirmMeal } = useData();
  return (
    <div>
      <span data-testid="student-name">{studentStats.name}</span>
      <span data-testid="meal-name">{upcomingMeal.name}</span>
      <span data-testid="meal-confirmed">
        {upcomingMeal.userConfirmed === null
          ? 'undecided'
          : upcomingMeal.userConfirmed
            ? 'yes'
            : 'no'}
      </span>
      <button data-testid="confirm-yes" onClick={() => confirmMeal(true)}>
        Yes
      </button>
      <button data-testid="confirm-no" onClick={() => confirmMeal(false)}>
        No
      </button>
    </div>
  );
}

describe('DataContext', () => {
  it('provides initial student stats', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    expect(screen.getByTestId('student-name')).toHaveTextContent('Alex');
    expect(screen.getByTestId('meal-name')).toHaveTextContent('Dinner');
    expect(screen.getByTestId('meal-confirmed')).toHaveTextContent('undecided');
  });

  it('updates meal confirmation to yes', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    fireEvent.click(screen.getByTestId('confirm-yes'));

    expect(screen.getByTestId('meal-confirmed')).toHaveTextContent('yes');
  });

  it('updates meal confirmation to no', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    fireEvent.click(screen.getByTestId('confirm-no'));

    expect(screen.getByTestId('meal-confirmed')).toHaveTextContent('no');
  });
});
