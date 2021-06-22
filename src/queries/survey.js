import gql from 'graphql-tag';

export const DETAILED_SURVEY = gql`
  query Surveys($id: ID!) {
    surveys(ids: [$id]) {
      ...surveyFields
    }
  }

  fragment surveyFields on SurveyPoll {
    id
    title
    questionTitle
    description
    date {
      id
      dateEnd
      dateStart
    }
    responseOptions {
      id
      title
      votesCount
    }
  }
`;

export const SURVEYS = gql`
  query Surveys {
    archived: surveys(archived: true) {
      ...surveyFields
    }
    ongoing: surveys(ongoing: true) {
      ...surveyFields
    }
  }

  fragment surveyFields on SurveyPoll {
    id
    title
    questionTitle
  }
`;

export const SUBMIT_SURVEY_RESPONSE = gql`
  mutation voteForSurvey($increaseId: ID, $decreaseId: ID) {
    voteForSurvey(increaseId: $increaseId, decreaseId: $decreaseId) {
      statusCode
    }
  }
`;