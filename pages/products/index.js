import React from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
const fakeData = [
    {
      id: 1,
      description: "Rooibos Tea",
      price: 100,
      imageUrl: "https://s3.images-iherb.com/ygt/ygt41533/v/11.jpg"
    },
    {
      id: 2,
      description: "Green Tea",
      price: 150,
      imageUrl: "https://s3.images-iherb.com/hnb/hnb01381/v/0.jpg"
    },
    {
      id: 3,
      description: "Black Tea",
      price: 200,
      imageUrl: "https://s3.images-iherb.com/hrn/hrn00959/v/4.jpg"
    }
  ]
const QUERY_PRODUCTS = gql`
query {
  products {
    id
    description
    price
    imageUrl
  }
}
`
const Products = () => {
    const { data, loading, error, refetch } = useQuery(QUERY_PRODUCTS)
    if (error) return <p>Ooops... something went wrong, please try again later.</p>
    
    if (loading) return <p>Loading....</p> //Insert loading spinner here

    
    return (
       <div style={{
           display: 'grid',
           gridTemplateColumns: '1fr 1fr 1fr',
           margin: '40px',
           gridGap: '10px'
       }}>
           {data.products.map(prod => 
            <div 
                key={prod.id} 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '30px',
                    border: 'solid 1px black',
                    padding: '10px'
                }}
            >
                <Link 
                    href='/products/[productId]' 
                    as={`/products/${prod.id}`}
                >
                    <a>
                        <img src={prod.imageUrl} alt={prod.description} width='250px' />
                    </a>
                </Link>
                <h3>{prod.description}</h3>
                <h4>{prod.price} THB</h4>
                <button style={{
                    background: 'green',
                    color: 'white',
                    padding: '10px',
                    cursor: 'pointer',
                    border: 'none',
                }}>Add to cart</button>
            </div>
            )}

       </div>
    )
}

export default Products
