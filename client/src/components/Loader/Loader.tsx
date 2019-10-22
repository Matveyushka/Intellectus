import * as React from 'react';

export interface LoaderProps {
  isLoading?: boolean;
}

export const Loader = (props: LoaderProps): React.ReactElement | null => {
  const { isLoading = true } = props;

  if (!isLoading) return null;

  return (
    <div className="loader-wrapper">
      <div className="loader" />
    </div>
  );
};
