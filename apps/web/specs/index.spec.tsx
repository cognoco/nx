import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';

describe('Page', () => {
  it('should render the home page with all key elements', () => {
    render(<Page />);

    // Verify main heading
    expect(
      screen.getByRole('heading', { name: /welcome to nx test/i, level: 1 })
    ).toBeTruthy();

    // Verify description text
    expect(
      screen.getByText(/a modern full-stack application built with next\.js 15/i)
    ).toBeTruthy();

    // Verify todos link
    const todosLink = screen.getByRole('link', { name: /view todos/i });
    expect(todosLink).toHaveAttribute('href', '/todos');
  });
});
