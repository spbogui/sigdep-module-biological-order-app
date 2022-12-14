import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useHousehold from './use-household';

describe('useHousehold', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useHousehold());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
