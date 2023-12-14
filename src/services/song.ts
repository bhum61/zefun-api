import Song  from "../models/Song";

export const getStats = async () => {
    const stats = await Song.aggregate([
      {
        "$group": {
          "_id": null,
          "count": {
            "$sum": 1
          },
          "artists": {
            "$addToSet": "$artist"
          },
          "albums": {
            "$addToSet": "$album"
          },
          "genres": {
            "$addToSet": "$genre"
          }
        }
      },
      {
        "$project": {
          "_id": 0,
          "count": 1,
          "artists": {
            "$size": "$artists"
          },
          "albums": {
            "$size": "$albums"
          },
          "genres": {
            "$size": "$genres"
          }
        }
      }
    ]);
  
    const genreStats = await Song.aggregate([
      {
        $group: {
          _id: "$genre",
          count: {
            $sum: 1
          }
        }
      }
    ]);
  
    const artistStats = await Song.aggregate([
      {
        "$group": {
          "_id": "$artist",
          "count": {
            "$sum": 1
          },
          "albums": {
            "$addToSet": "$album"
          }
        }
      },
      {
        "$project": {
          "_id": 0,
          "artist": "$_id",
          "count": 1,
          "albums": {
            "$size": "$albums"
          }
        }
      }
    ])
  
  
    const res = {
      stats,
      genreStats,
      artistStats
    };
  
    return res;
  }  