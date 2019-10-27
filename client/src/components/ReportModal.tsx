import * as React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { OptionTable } from './OptionTable';
import { ProblemTable } from './ProblemTable';
import { MainState } from '../pages/Main/initialState';
import { State } from '../store';
import { Modal } from './Modal/Modal';
import { ReportForm, DefaultReportData } from './forms/ReportForm';
import { Loader, LoaderState } from './Loader';
import { FinishFormState } from '../commonTypes';
import { hideModal } from './Modal/actions';
import { showLoader, hideLoader } from './Loader/actions';

type FinishState = FinishFormState<DefaultReportData>

const defaultFinishFormState: FinishState = {
  isFinish: false,
  error: undefined,
  oldData: {},
};

export const ReportModal = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [finishState, setFinishState] = React.useState<FinishState>(defaultFinishFormState);
  const {
    questions, stepIndex, solutions, token,
  } = useSelector<State, MainState>(state => state.main);
  const { isLoading } = useSelector<State, LoaderState>(state => state.loader);

  const currentOptions = questions ? questions[stepIndex].options : [];
  const rightAnswerIndex = solutions ? solutions[stepIndex] : 0;

  /*
   * TODO По сути эта логика очень похожа во всех наших формах,
   * надо бы вынести её в отдельный компонент FormContainer
   */
  const onReportSubmit = (formData: DefaultReportData): void => {
    dispatch(showLoader());
    let error: string;
    const data = {
      ...formData,
      numberOfQuestion: stepIndex + 1,
      token,
    };

    axios('/report', { method: 'post', data })
      .catch((err: Error) => {
        error = 'Something went wrong';

        throw err;
      })
      .finally(() => {
        setFinishState({
          oldData: data,
          isFinish: true,
          error,
        });

        dispatch(hideLoader());
      });
  };

  const tryToSendFormAgain = (): void => setFinishState({
    ...defaultFinishFormState,
    oldData: finishState.oldData,
  });

  if (isLoading) {
    return (
      <Modal>
        <div className="contact-results padding-for-modal">
          <Loader />
        </div>
      </Modal>
    );
  }

  if (finishState.isFinish) {
    return (
      <Modal>
        <div className="contact-results padding-for-modal">
          {finishState.error ? (
            <>
              <div className="error">{finishState.error}</div>
              <div className="button" onClick={tryToSendFormAgain}>
                    Try again
              </div>
            </>
          ) : (
            <div className="success">We got your feedback</div>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className="test-view-content">
        <div className="test-view-header">
          <h1 className="problem-title">Problem:</h1>
          <h1 className="problem-title options">Options:</h1>
        </div>
        <div className="test-view-body">
          <div className="problem-wrapper">
            <ProblemTable rightAnswer={currentOptions[rightAnswerIndex]} />
          </div>
          <div className="test-view-separator" />
          <div className="option-wrapper">
            <OptionTable rightAnswerIndex={rightAnswerIndex} />
          </div>
        </div>
      </div>
      <ReportForm
        reportFormSubmit={onReportSubmit}
        data={finishState.oldData}
        cancelForm={() => dispatch(hideModal())}
      />
    </Modal>
  );
};
