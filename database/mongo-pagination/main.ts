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
    page = 1, // default page is 1
  } = req.query;

  const pageSize = 10; // Set your default pageSize here

  const searchQuery: any = {
    "head.post": "active", // filter head.post
  };

  // ... (your existing code for building searchQuery)

  let sortOption: any = {};
  switch (
    sorting
    // ... (your existing code for sorting)
  ) {
  }

  try {
    // Calculate skip value for pagination
    const skip = (Number(page) - 1) * pageSize;

    // Calculate total number of records without pagination
    const totalRecords = await Estate.countDocuments(searchQuery);

    // Search and retrieve estates with pagination
    const estates = await Estate.find(searchQuery)
      .populate("user")
      .select("-__v")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(pageSize));

      res.status(200).json({ estates, totalRecords });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error });
  }
};
