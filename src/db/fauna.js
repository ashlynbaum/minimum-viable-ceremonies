import fauna from "faunadb"
import phrase from "random-words"
const db = new fauna.Client({
  secret: process.env.FAUNA_SECRET || 'fnADqcsiRcACCisk6ap3M_p4s1h0CZSOis2tSYX6'
})
const { Collection, Create, Get } = fauna.query

export const getRoom = uuid => (
  uuid ? db.query(Get(Collection("rooms"), { data: { uuid } }))
       : updateRoom({
         uuid: phrase({ exactly: 3, join: '-' }),
         placements: {},
         players: {}
       }).then(({ data }) => data)
)

export const updateRoom = data => (
  db.query(Create(Collection("rooms"), { data }))
)
