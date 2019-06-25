import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Sponsors from '../components/Sponsors'
import Info from '../components/Info/'
import Attendees from '../components/Attendees'
import Speakers from '../components/Speakers'
import Thanks from '../components/Thanks'
import Panel from '../components/Panel'

export const query = graphql`
  fragment SanityImage on SanityImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings {
      title
      description
      location
      date
      organizers
    }
    organizers: allSanityOrganizer {
      edges {
        node {
          id
          name
          email
        }
      }
    }
    thanks: allSanityThanks {
      edges {
        node {
          name
          link
          reason
        }
      }
    }
    thanks: allSanityThanks {
      edges {
        node {
          id
          link
          name
        }
      }
    }
    attendees: allSanityAttendee {
      edges {
        node {
          id
          ghLink
          name
        }
      }
    }
    sponsors: allSanitySponsor {
      edges {
        node {
          name
          link
          media {
            asset {
              url
            }
          }
        }
      }
    }
    speakers: allSanitySpeaker {
      edges {
        node {
          id
          job
          name
          twitterLink
          photo {
            ...SanityImage
          }
        }
      }
    }
  }
`

const IndexPage = ({ data = {} }) => {
  const { site, organizers, thanks, speakers, attendees, sponsors } = data

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Info site={site} />
        <Panel heading="What?">
          <p
            css={`
              font-family: 'NeutraText-Bold';
              font-size: 18px;
              line-height: 28px;
            `}
          >
            This idea started when a random dude on twitter said he doesn't think "React Girls" is a
            good idea because he's gay and wouldn't want to be in a conference with only gay people.
            So now welcome to QueerJS.
            <br />
            This is a meetup where anyone is welcome to attend and support the speakers and the idea
            but all the speakers will be Queer.
            <br />
            Join us! There will be food and stickers 🌈
          </p>
        </Panel>
        <Panel heading="Speakers">
          {speakers.edges && <Speakers speakers={speakers.edges.map(({ node }) => node)} />}
        </Panel>
        <Panel heading="Attendees">
          <Attendees attendees={attendees} />
        </Panel>

        <Panel heading="Sponsors">
          <Sponsors sponsors={sponsors} />
        </Panel>
      </main>
      <Panel heading="Special Thanks">
        <Thanks organizers={organizers} thanks={thanks} />
      </Panel>
    </Layout>
  )
}

export default IndexPage
