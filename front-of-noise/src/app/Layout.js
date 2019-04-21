import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Site from './layout/Site'
import Header from './layout/Header'
import Content from './layout/Content'
import Router from './layout/Router'
import Footer from './layout/Footer'

const Layout = ({ children }) => (
  <Site>
    <Helmet
      title="Friends of Noise"
      meta={[
        { name: 'description', content: 'membership and store portals for the PDX-based non-profit!' },
        { name: 'keywords', content: 'all ages venues, concerts, portland, pdx, music, shows, scene, events, tickets, reservations, merchandise, store, friends, of, noise, friends of noise, fon, oregon' },
      ]}
      script={[
        { 'src': 'https://use.fontawesome.com/releases/v5.0.4/js/all.js'},
      ]}
      link={[
        {'rel':'stylesheet', 'href': 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'}
      ]}
    />
    <Header />
    <Content>
      <Router />
	    {/* {children()} */}
    </Content>
    <Footer />
  </Site>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
