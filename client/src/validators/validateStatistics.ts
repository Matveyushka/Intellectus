import om from 'omyumyum';

export const validateStatistics = (data: unknown): boolean => om(om.object.exactShape({
  averageTime: om.number,
  averageTimeDistribution: om.array.of(om.number),
  passedTestsCounter: om.number,
  pointsDistribution: om.array.of(om.number),
}), data);
