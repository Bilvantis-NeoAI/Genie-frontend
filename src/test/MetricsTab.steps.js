import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

import MetricTabs from '../components/MetricsTab';
jest.mock('../components/SeverityMetric', () => () => <div>Severity Metric Content</div>);
jest.mock('../components/QualityMetric', () => () => <div>Quality Metric Content</div>);
jest.mock('../components/UsageMetric', () => () => <div>Usage Metric Content</div>);
jest.mock('../components/CommitReviewMetric', () => () => <div>Commit Review Metric Content</div>);

describe('MetricTabs Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter> {/* Wrap your component with BrowserRouter */}
        <MetricTabs />
      </BrowserRouter>
    );
  });

  it('renders without crashing and displays the Severity tab by default', () => {
    expect(screen.getByText('Issue Severity Distribution')).toBeInTheDocument();
    expect(screen.getByText('Severity Metric Content')).toBeInTheDocument();
  });

  it('changes content when tabs are clicked', () => {
    const qualityTab = screen.getByText('Code Quality Per User');
    fireEvent.click(qualityTab);
    expect(screen.getByText('Quality Metric Content')).toBeInTheDocument();

    const usageTab = screen.getByText('Usage Metrics');
    fireEvent.click(usageTab);
    expect(screen.getByText('Usage Metric Content')).toBeInTheDocument();

    const commitTab = screen.getByText('Commit Review Metrics');
    fireEvent.click(commitTab);
    expect(screen.getByText('Commit Review Metric Content')).toBeInTheDocument();
  });

  it('correctly toggles tab colors when active', () => {
    const getButton = (text) => screen.getByText(text).closest('a');

    expect(getButton('Issue Severity Distribution')).toHaveStyle('color: #07439C');
    expect(getButton('Code Quality Per User')).toHaveStyle('color: #666666');

    fireEvent.click(getButton('Code Quality Per User'));
    expect(getButton('Code Quality Per User')).toHaveStyle('color: #07439C');
    expect(getButton('Issue Severity Distribution')).toHaveStyle('color: #666666');
  });
});
