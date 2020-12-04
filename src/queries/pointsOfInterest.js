import gql from 'graphql-tag';

export const GET_POINTS_OF_INTEREST = gql`
  query PointsOfInterest($limit: Int, $order: PointsOfInterestOrder, $category: String) {
    pointsOfInterest(limit: $limit, order: $order, category: $category) {
      id
      name
      category {
        name
      }
      description
      mediaContents {
        contentType
        captionText
        copyright
        sourceUrl {
          url
        }
      }
      addresses {
        city
        street
        zip
        kind
        geoLocation {
          latitude
          longitude
        }
      }
      contact {
        email
        phone
        lastName
      }
      webUrls {
        url
      }
    }
  }
`;

export const GET_POINT_OF_INTEREST = gql`
  query PointOfInterest($id: ID!) {
    pointOfInterest(id: $id) {
      id
      title: name
      category {
        name
      }
      description
      mediaContents {
        contentType
        captionText
        copyright
        sourceUrl {
          url
        }
      }
      dataProvider {
        logo {
          url
        }
        name
      }
      addresses {
        city
        street
        zip
        kind
        addition
        geoLocation {
          latitude
          longitude
        }
      }
      contact {
        email
        phone
        lastName
      }
      webUrls {
        url
      }
      priceInformations {
        category
        amount
        description
        maxChildrenCount
        maxAdultCount
        groupPrice
      }
      openingHours {
        sortNumber
        weekday
        timeFrom
        timeTo
        open
        dateFrom
        dateTo
        description
      }
      operatingCompany {
        name
        address {
          id
          kind
          addition
          street
          zip
          city
        }
        contact {
          firstName
          lastName
          phone
          email
          fax
          webUrls {
            url
          }
        }
      }
    }
  }
`;
