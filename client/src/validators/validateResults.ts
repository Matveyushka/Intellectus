import om from 'omyumyum';

export const validateResults = (data: unknown): boolean => om(om.object.exactShape({
  token: om.string,
  questions: om.array.of(
    om.object.exactShape({
      problemFields: om.array.of(om.string.or.null),
      options: om.array.of(om.string),
    }),
  ),
}), data);
