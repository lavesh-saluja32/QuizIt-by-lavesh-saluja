import * as yup from "yup";

export const quizTimingValidationSchema = t =>
  yup
    .object({
      enableQuizTiming: yup.boolean(),

      hours: yup
        .number()
        .min(0, t("validation.hoursMin", "Hours cannot be negative"))
        .max(23, t("validation.hoursMax", "Maximum 23 hours allowed"))
        .when("enableQuizTiming", {
          is: true,
          then: schema => schema.required(t("validation.required")),
        }),

      minutes: yup
        .number()
        .min(0, t("validation.minutesMin", "Minutes cannot be negative"))
        .max(59, t("validation.minutesMax", "Maximum 59 minutes allowed"))
        .when("enableQuizTiming", {
          is: true,
          then: schema => schema.required(t("validation.required")),
        }),
    })
    .test("non-zero-time", t("validation.nonZeroTimer"), values => {
      if (!values.enableQuizTiming) return true;

      return values.hours + values.minutes > 0;
    });

export const MINIMUM_TIME = 0;
export const MAXIMUM_TIME = 59;
