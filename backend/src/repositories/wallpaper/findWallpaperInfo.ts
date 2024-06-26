import { Document, ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';
import { Wallpaper } from '@src/models/wallpaperModel';

const findWallpaperInfo = async (wallpaperId: ObjectId, userId?: ObjectId): Promise<Wallpaper> => {
  const pipeline: Document[] = [
    {
      $match: {
        _id: wallpaperId,
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'publisherId',
        foreignField: '_id',
        as: 'publisher',
      },
    },
    {
      $lookup: {
        from: 'comments',
        pipeline: [
          {
            $match: {
              wallpaperId: wallpaperId,
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $limit: 2,
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: '$user',
          },
          {
            $project: {
              description: 1,
              createdAt: 1,
              user: {
                username: '$user.username',
                avatar: '$user.avatar',
              },
            },
          },
        ],
        as: 'comments',
      },
    },
    {
      $addFields: {
        category: { $arrayElemAt: ['$category', 0] },
        publisher: { $arrayElemAt: ['$publisher', 0] },
      },
    },
  ];

  if (userId) {
    pipeline.push(
      ...[
        {
          $lookup: {
            from: 'likes',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$userId', userId] }, { $eq: ['$wallpaperId', wallpaperId] }],
                  },
                },
              },
            ],
            as: 'like',
          },
        },
        {
          $lookup: {
            from: 'saves',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$userId', userId] }, { $eq: ['$wallpaperId', wallpaperId] }],
                  },
                },
              },
            ],
            as: 'save',
          },
        },
        {
          $addFields: {
            liked: { $gt: [{ $size: '$like' }, 0] },
            saved: { $gt: [{ $size: '$save' }, 0] },
          },
        },
      ]
    );
  }

  pipeline.push({
    $project: {
      image: { large: 1 },
      title: 1,
      likeCount: 1,
      createdAt: 1,
      category: '$category.title',
      publisher: {
        username: '$publisher.username',
        avatar: '$publisher.avatar',
      },
      comments: 1,
      liked: 1,
      saved: 1,
    },
  });

  const wallpapersCollection = await getWallpapersCollection();

  const cursor = await wallpapersCollection.aggregate(pipeline);
  const result = await cursor.toArray();
  const wallpaper = result[0];

  return wallpaper as Wallpaper;
};

export default findWallpaperInfo;
