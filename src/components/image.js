import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ alt, path, klass }) => (
  <StaticQuery
     query={graphql`
       query {
         images: allFile {
           edges {
             node {
               relativePath
               name
               childImageSharp {
                 fluid(maxWidth: 600) {
                   ...GatsbyImageSharpFluid
                 }
               }
             }
           }
         }
       }
     `}
     render={data => {
       const image = data.images.edges.find(n => n.node.relativePath.includes(path))
       if (!image) { return null }

       return <Img className={`image image-${klass}`} alt={alt} fluid={image.node.childImageSharp.fluid} />
     }}
   />
)

export default Image
