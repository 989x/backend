import mongoose from "mongoose";
import Estate, { EstateDocument, IEstate } from "../models/estate";
import SearchRecord, { SearchRecordDocument } from "../models/searchRecord";

// ________________________________________ lib

// Utility function to check if a keyword is valid
const isValidKeyword = (keyword: string): boolean => {
  // Use a regular expression to check for unwanted characters
  const unwantedCharsPattern = /[^a-zA-Z0-9\s]/;

  return !unwantedCharsPattern.test(keyword);
};

// ________________________________________ searching

const searchEstate = async (req: Request, res: Response) => {
  const {
    keyword,
    findStatus,
    findType,
    minBed,
    minBath,
    minPrice,
    maxPrice,
    sorting,
    page = 1,
  } = req.query;

  const pageSize = 12; // Set your default pageSize here

  const searchQuery: any = {
    "head.post": "active", // filter head.post
  };

  if (keyword && keyword.toString().length <= 60) {
    searchQuery["$or"] = [
      { "desc.title": { $regex: keyword, $options: "i" } },
      { "desc.about": { $regex: keyword, $options: "i" } },
      { "maps.address": { $regex: keyword, $options: "i" } },
      { "maps.subdistrict": { $regex: keyword, $options: "i" } },
      { "maps.district": { $regex: keyword, $options: "i" } },
      { "maps.province": { $regex: keyword, $options: "i" } },
      // { "maps.postcode": { $regex: keyword, $options: "i" } },
      { "maps.country": { $regex: keyword, $options: "i" } },
    ];
  }
  if (findStatus) {
    const statusValues = (findStatus as string).split(",");
    searchQuery["desc.status"] = { $in: statusValues };
  }
  if (findType) {
    const typeValues = (findType as string).split(",");
    searchQuery["desc.type"] = { $in: typeValues };
  }
  if (minBed) {
    searchQuery["desc.bed"] = { $gte: Number(minBed) };
  }
  if (minBath) {
    searchQuery["desc.bath"] = { $gte: Number(minBath) };
  }
  if (minPrice && maxPrice) {
    searchQuery["desc.price"] = {
      $gte: Number(minPrice),
      $lte: Number(maxPrice),
    };
  } else if (minPrice) {
    searchQuery["desc.price"] = { $gte: Number(minPrice) };
  } else if (maxPrice) {
    searchQuery["desc.price"] = { $lte: Number(maxPrice) };
  }

  let sortOption: any = {};
  switch (sorting) {
    case "lowestPrice":
      sortOption = { "desc.price": 1 };
      break;
    case "highestPrice":
      sortOption = { "desc.price": -1 };
      break;
    case "oldestDate":
      sortOption = { "head.updatedAt": 1 };
      break;
    case "newestDate":
      sortOption = { "head.updatedAt": -1 };
      break;
    case "bedroomAscending":
      sortOption = { "desc.bed": 1 };
      break;
    case "bedroomDescending":
      sortOption = { "desc.bed": -1 };
      break;
    default:
      // Default sorting or no sorting
      break;
  }

  try {
    // Calculate skip value for pagination
    const skip = (Number(page) - 1) * pageSize;

    // Calculate total number of records without pagination
    const totalRecords = await Estate.countDocuments(searchQuery);

    // Search and retrieve estates
    const estates = await Estate.find(searchQuery)
      .populate("user")
      .select("-__v")
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    // ____________________ Search records

    if (
      keyword &&
      keyword.toString().length >= 4 &&
      keyword.toString().length <= 60 &&
      isValidKeyword(keyword.toString())
    ) {
      let query = keyword.toString();
      // console.log('Search Record Query:', query);

      const existingRecord = await SearchRecord.findOne({ query });
      // console.log('Existing Record:', existingRecord);

      if (existingRecord) {
        existingRecord.count += 1;
        // console.log('Updated Record:', existingRecord);
        await existingRecord.save();
      } else {
        const today = new Date().toISOString().split("T")[0];
        const newRecord = new SearchRecord({
          query,
          count: 1,
          tag: "estate",
          date: today,
        });
        await newRecord.save();
        // console.log('New Record Created:', newRecord);
      }
    }

    res.status(200).json({ estates, totalRecords });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  searchEstate,
};
