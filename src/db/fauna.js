import fauna from "faunadb"
import phrase from "random-words"
const db = new fauna.Client({
  secret: process.env.FAUNA_SECRET || 'fnADqcsiRcACCisk6ap3M_p4s1h0CZSOis2tSYX6'
})
const { Get, Match, Create, Index, Collection } = fauna.query

const existingRoom = uuid => {
  if (!uuid) { return }

  return db.query(Get(Match(Index("rooms_by_uuid"), uuid)))
}

export const getRoom = uuid => (
  (existingRoom(uuid) || updateRoom({
    uuid: phrase({ exactly: 3, join: '-' }),
    placements: {},
    players: {}
  })).then(({ data }) => data)
)

export const updateRoom = data => (
  db.query(Create(Collection("rooms"), { data }))
)
