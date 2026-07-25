import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the auth page when not logged in', () => {
    render(<App />);
    expect(screen.getByText('JVM Explorer')).toBeInTheDocument();
    const signInElements = screen.getAllByText('Sign In');
    expect(signInElements.length).toBe(2);
  });

  it('shows register toggle', () => {
    render(<App />);
    const toggle = screen.getByText("Don't have an account? Register");
    expect(toggle).toBeInTheDocument();
  });
});
