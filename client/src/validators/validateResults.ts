import om from 'omyumyum';

export const validateResults = (data: unknown): boolean => om(om.object.exactShape({
  solutions: om.array.of(om.number),
  pointsDistribution: om.array.of(om.number),
}), data);
