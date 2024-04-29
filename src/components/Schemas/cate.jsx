

const supOptions = ["Groceries", "ConsumerElectronics", "FashionAndAccessories", "AutoParts", "FoodAndBeverages", "BabyCenter", "BeautyAndFragrances", "HomeGardenAndFurniture", "MachineryAndEquipment", "OfficeAndStationery", "PersonalCare", "PetAndAnimalCare", "SportsAndFitness", "Toys", "ToolsAndHomeImprovement", "Electrical"];


const subOptions = {
  Groceries: ["red", "green"],
  ConsumerElectronics: ["AudioAndStudio", "CamerasAndCamcorders", "ComputersAndAccessories", "ElectricalAndElectronicAccessories", "GamingAndConsoles", "MobilePhonesAndTablets", "MusicalInstruments", "ProjectorsAndAccessories", "SmartHomeSolutions", "TelephonesAndCommunication", "TelevisionsAndStreamingDevices", "Wearables"],
  FashionAndAccessories: ["Bags", "Clothing", "Eyewear", "Footwear", "WatchesAndJewelry"],
  AutoParts: ["yellow", "black"],
  FoodAndBeverages: ["BakeryAndPastry", "Beverages", "Confectionery", "DairyAndEggs", "FrozenFood", "FruitAndVegetables", "MeatPoultryAndFish", "Pantry"],
  BabyCenter: ["BabyCare", "BabyClothingAndFootwear", "BabyDiapering", "BabyFeedingAndNursing", "BabyGear", "BabyNursery"],
  BeautyAndFragrances: ["BeautyTools", "Fragrances", "Makeup", "Nails", "Skincare"],
  HomeGardenAndFurniture: ["Appliances", "CommercialFurniture", "GardenAndOutdoor", "HomeDecor", "HomeFurniture", "HomeTextiles", "HouseholdSupplies", "KitchenAndDining"],
  MachineryAndEquipment: ["Printers3D", "AgriculturalMachineryEquipment", "ApparelAndTextileMachinery", "ChemicalAndPharmaceuticalMachinery", "CleaningAndFiltrationMachinery", "EngineeringAndConstructionMachinery", "FoodAndBeverageMachinery", "PackagingMachine", "PlasticAndRubberProcessingMachinery"],
  OfficeAndStationery: ["ArtAndCrafts", "BoardsAndEasels", "Books", "DeskSupplies", "FilesAndFolders", "GeneralSupplies", "OfficeFurniture", "OfficeMachinesAndEquipments", "PackagingMaterial", "PrintersScannersAndLabelMachines", "PrintingPaper", "TapesAndAdhesives", "TonersAndInkCartridges", "WritingInstruments", "WritingMaterial"],
  PersonalCare: ["Hair", "PersonalCare", "PersonalCareTools"],
  PetAndAnimalCare: ["AnimalFeedsAndSupplements", "PetAndAnimalsSupplies", "PetFood", "PetFurniture"],
  SportsAndFitness: ["FitnessAndTraining", "SportsAndOutdoorActivities", "WaterSportShoes", "WaterSportsAndActivities"],
  Toys: ["ArtsAndCrafts", "BabyToddlerToys", "BatteryOperatedToys", "ConstructionToys", "DollsAndDollhouses", "LearningAndEducational", "MusicalToys", "NoveltyToys", "OutdoorAndPlayground", "PlayFiguresAndVehicles", "PretendPlayAndCostumes", "PuzzlesAndGames"],
  ToolsAndHomeImprovement: ["BathroomAndKitchen", "Construction", "DoorsAndWindows", "ElectricalSupplies", "HomeImprovement", "Lighting", "SafetyAndSecurity", "TestMeasureAndInspect", "ToolsAndHardware"],
  Electrical: ["gray", "pink"],
};


const miniSubOptions = {
  red: ["sweetred", "sourred"],
  green: ["sweetgreen", "sourgreen"],

  AudioAndStudio: ["AmplifiersAndSpeakers", "AudioAndVideoAccessories", "HeadphonesAndHeadsets", "MediaPlayers", "Radio", "RecordingAndStudioEquipment"],
  CamerasAndCamcorders: ["Camcorders", "CameraAccessories"],
  ComputersAndAccessories: ["ComputerAndLaptopComponents", "ComputerAccessories"],
  ElectricalAndElectronicAccessories: ["Adapters", "CablesAndConnectors"],
  GamingAndConsoles: ["GamingAccessories", "GamingConsoles"],
  MobilePhonesAndTablets: ["ChargersAndBatteries", "MobilePhoneAndTabletAccessories"],
  MusicalInstruments: ["KeyboardInstruments", "PercussionInstruments"],
  ProjectorsAndAccessories: ["ProjectorAccessories", "Projectors"],
  SmartHomeSolutions: ["SmartDevices", "SmartHomeDevices"],
  TelephonesAndCommunication: ["CommunicationAccessories", "Telephones"],
  TelevisionsAndStreamingDevices: ["DigitalDisplays", "HomeEntertainmentSystems"],
  Wearables: ["FitnessTrackersAndAccessories", "SmartWatchesAndAccessories"],

  Bags: ["CasualBags", "FashionBags"], 
  Clothing: ["Accessories", "Beachwear"], 
  Eyewear: ["ContactLenses", "Glasses"], 
  Footwear: ["KidsShoes", "Shoes"], 
  WatchesAndJewelry: ["JewelryAndAccessories", "Watches"],

  yellow: ["sweetyellow", "souryellow"],
  black: ["sweetblack", "sourblack"],

  BakeryAndPastry: ["BreadAndWraps", "Pastry"],
  Beverages: ["Coffee", "FitnessDrinks"], 
  Confectionery: ["Chocolate", "CookiesAndBiscuits"], 
  DairyAndEggs: ["Butter", "Cheese"], 
  FrozenFood: ["FrozenFishAndSeafood", "FrozenFruitsAndVegetables"], 
  FruitAndVegetables: ["FreshFruits", "FreshVegetables"], 
  MeatPoultryAndFish: ["FishAndSeafood", "Meat"], 
  Pantry: ["BakingDecorations", "BakingIngredients"],

  BabyCare: ["BabyBath", "BabyHealthCareAndGrooming"], 
  BabyClothingAndFootwear: ["BabyClothing", "BabyClothingAccessories"], 
  BabyDiapering: ["BabyDiapers", "ChangingPads"], 
  BabyFeedingAndNursing: ["BabyFeeding", "BabyFood"], 
  BabyGear: ["Activity", "ChairsAndSeats"], 
  BabyNursery: ["BabyBeddings", "BabyFurniture"], 

  BeautyTools: ["MakeupToolsAndAccessories", "NailCareTools"], 
  Fragrances: ["Perfumes"], 
  Makeup: ["BodyArt", "BodyMakeup"], 
  Nails: ["NailArt", "NailCareProducts"],
  Skincare: ["EyeCare", "FaceCare"],

  Appliances: ["CleaningAppliances", "CoffeeAndEspressoMachines"], 
  CommercialFurniture: ["BarFurniture", "HairSalonFurniture"], 
  GardenAndOutdoor: ["BBQAndGrills", "GardenDecor"], 
  HomeDecor: ["ArtworkAndFrames", "Clocks"], 
  HomeFurniture: ["Bedrooms", "DiningRooms"], 
  HomeTextiles: ["Bedding", "CarpetsAndRugs"], 
  HouseholdSupplies: ["BathroomAccessories", "CleaningSupplies"], 
  KitchenAndDining: ["Bakeware", "CoffeeAndTeaTools"], 

  Printers3D: ["Printers3D"], 
  AgriculturalMachineryEquipment: ["AgriculturalMachineryParts", "AgriculturalSprayer"], 
  ApparelAndTextileMachinery: ["ApparelAndTextileMachineryParts", "ApparelMachinery"], 
  ChemicalAndPharmaceuticalMachinery: ["ChemicalMachineryAndEquipment", "CosmeticsProductionEquipment"], 
  CleaningAndFiltrationMachinery: ["AirCleaningEquipment", "CleaningEquipmentParts"], 
  EngineeringAndConstructionMachinery: ["AbrasiveMachines", "BuildingMaterialMachinery"], 
  FoodAndBeverageMachinery: ["BakingEquipment", "BeanProductProcessingMachinery"], 
  PackagingMachine: ["AuxiliaryPackagingMachines", "BlisterPackahingMachines"],
  PlasticAndRubberProcessingMachinery: ["FoamCuttingMachine", "FoamMachinery"], 

  ArtAndCrafts: ["ArtAndCraftPaper", "ArtAndCraftSets"], 
  BoardsAndEasels: ["BoardAccessories", "BulletinBoards"], 
  Books: ["BookReaders", "ChildrensBooks"], 
  DeskSupplies: ["BinsAndBaskets", "BusinessCardsAndOrganizers"], 
  FilesAndFolders: ["DividersAndBookmarks", "DocumentBagsAndDisplayBooks"], 
  GeneralSupplies: ["Batteries", "BinderClipsAndPins"], 
  OfficeFurniture: ["CabinetsAndDrawerUnits", "ChairsAndSeating"], 
  OfficeMachinesAndEquipments: ["AttendanceMachines", "BindingMachines"], 
  PackagingMaterial: ["GiftBagsBoxesAndWraps", "PackagingPaperAndWraps"], 
  PrintersScannersAndLabelMachines: ["AddressLabels", "BarcodeLabels"], 
  PrintingPaper: ["ColorPaper", "CopyPaper"], 
  TapesAndAdhesives: ["DuctTapes", "GluesAndAdhesives"], 
  TonersAndInkCartridges: ["InkCartridges", "TonersCartridges"], 
  WritingInstruments: ["CorrectionPensAndFluids", "GeometryAndScienceSupplies"], 
  WritingMaterial: ["AddressAndAccountingBooks", "CalendarJournalAndDiaries"],

  Hair: ["HairAccessories", "HairCare"], 
  PersonalCare: ["BathAndBody", "HairSalonDisposables"], 
  PersonalCareTools: ["HairStylingTools", "ShavingAndHairRemovalTools"], 

  AnimalFeedsAndSupplements: ["AnimalFeedsAndSupplements"], 
  PetAndAnimalsSupplies: ["CleaningSupplies", "CollarsAndLeashes"], 
  PetFood: ["Chews", "DryFoods"], 
  PetFurniture: ["Aquariums", "Beds"],

  FitnessAndTraining: ["ExerciseMachines", "FitnessAccessories"], 
  SportsAndOutdoorActivities: ["BallGames", "BikePartsAndTools"], 
  WaterSportShoes: ["WaterSportShoes"], 
  WaterSportsAndActivities: ["WaterSportsAndActivities"], 
  
  ArtsAndCrafts: ["AdventCalendars", "CraftSets"],  
  BabyToddlerToys: ["BabyGymsAndPlaymats", "BabyToys"], 
  BatteryOperatedToys: ["RemoteControlToys"], 
  ConstructionToys: ["BuildingBlocks", "BuildingToys"], 
  DollsAndDollhouses: ["DollhousesAndAccessories", "Dolls"], 
  LearningAndEducational: ["LanguageAndLiteracy", "MathAndCountToys"], 
  MusicalToys: ["SoundAndLightToys"], 
  NoveltyToys: ["FidgetToys", "SquishyToys"], 
  OutdoorAndPlayground: ["BeachToys", "BikesScootersAndRideOns"], 
  PlayFiguresAndVehicles: ["AnimalAndActionFigures", "VehicleToys"], 
  PretendPlayAndCostumes: ["DressingUpAndCostumes", "PretendPlay"], 
  PuzzlesAndGames: ["Games", "Puzzles"],

  BathroomAndKitchen: ["BathroomAndKitchenAccessories", "SinksVanitiesAndCabinets"], 
  Construction: ["BuildingBoards", "BuildingGlassAndAccessories"], 
  DoorsAndWindows: ["DoorAndWindowHardware", "Doors"], 
  ElectricalSupplies: ["CablesWiresAndAccessories", "FusesAndCircuitBreakers"], 
  HomeImprovement: ["AdhesivesAndFillers", "PaintAndCoating"], 
  Lighting: ["IndoorLighting", "OutdoorLighting"], 
  SafetyAndSecurity: ["Alarms", "ChildSafety"], 
  TestMeasureAndInspect: ["DimensionalAndLevelMeasurement", "ElectricalMeasurement"], 
  ToolsAndHardware: ["Fasteners", "FurnitureHardware"],
  
  gray: ["sweetgray", "sourgray"],
  pink: ["sweetpink", "sourpink"],
};


const microSubOptions = {
  sweetred: ["one", "two"],
  sourred: ["three", "four"],
  sweetgreen: ["five", "six"],
  sourgreen: ["seven", "eight"],

  AmplifiersAndSpeakers: ["Amplifiers", "Boomboxes", "CeilingSpeakers", "ComputerSpeakers", "FloorStandSpeakers", "Loudspeakers", "MonitorSpeakers", "OutdoorSpeakers", "PortableSpeakers", "SoundbarSpeakers", "Subwoofers", "WallMountSpeakers"],
  AudioAndVideoAccessories: ["AudioAndVideoSplitters", "AudioConverters"],
  HeadphonesAndHeadsets: ["HeadphoneAccessories", "Headphones"],
  MediaPlayers: ["BluRayPlayers", "CDPlayersAndRecorders"],
  Radio: ["AnalogRadios", "ClockRadios", "DigitalRadios"],
  RecordingAndStudioEquipment: ["KaraokeSystems", "MicrophoneCovers", "MicrophoneFilters", "Microphones", "VoiceRecorders"],

  Camcorders: ["DVDCamcorders", "FlashMemoryCamcorders"], 
  CameraAccessories: ["AccessoriesSets", "CameraBagsCoversAndCases"],

  ComputerAndLaptopComponents: ["CPUsAndProcessors", "ComputerFans"], 
  ComputerAccessories: ["CDsAndDVDsCases", "CardReadersAndWriters" ],

  Adapters: ["CableAdapters", "PowerAdapters"], 
  CablesAndConnectors: ["AUXCables", "AudioCables"],

  GamingAccessories: ["BatteriesAndChargers", "GameCaptureCards"], 
  GamingConsoles: ["Nintendo", "Playstation", "XBox"], 

  ChargersAndBatteries: ["CarChargers", "ChargingCables"], 
  MobilePhoneAndTabletAccessories: ["ArmBands", "CoversAndCases"],

  KeyboardInstruments: ["Accordion", "ElectricOrgan"], 
  PercussionInstruments: ["Castanets", "ChimesAndTriangles"], 

  ProjectorAccessories: ["PresentationPointers", "ProjectorAirFilters"], 
  Projectors: ["DLPProjectors", "LCDProjectors"],

  SmartDevices: ["SmartDevices"], 
  SmartHomeDevices: ["SmartDisplays", "SmartLights"],

  CommunicationAccessories: ["CordlessPhoneBatteries", "LandlineHeadsets"], 
  Telephones: ["CallerIDTelephones", "CordedTelephones"],

  DigitalDisplays: ["DigitalSignage", "InteractiveDisplays"], 
  HomeEntertainmentSystems: ["HiFiSystems", "HomeTheaterSystems"],

  FitnessTrackersAndAccessories: ["FitnessTrackerBands", "FitnessTrackerChargers"], 
  SmartWatchesAndAccessories: ["SmartWatchAccessories", "SmartWatchBands"],

  CasualBags: ["BagAccessories", "SchoolBagsAndBackpacks"], 
  FashionBags: ["BeltBags", "CrossbodyBags"],

  Accessories: ["BeltsAndSuspenders", "BowsAndTies"], 
  Beachwear: ["BeachDresses", "Bikinis"],

  ContactLenses: ["ColoredContactLenses", "ContactLensesSolutions"], 
  Glasses: ["EyeglassesFrames", "ReadingGlasses"],

  KidsShoes: ["KidsBoots", "KidsFlats"], 
  Shoes: ["Boots", "CasualShoes"],

  JewelryAndAccessories: ["Anklets", "Bracelets"], 
  Watches: ["AnalogWatches", "DigitalWatches"],

  sweetyellow: ["seventeen", "eighteen"],
  souryellow: ["nineteen", "twenty"],
  sweetblack: ["twentyone", "twentytwo"],
  sourblack: ["twentythree", "twentyfour"],

  BreadAndWraps: ["BunsAndRolls", "Flatbread"],
  Pastry: ["CakesAndMuffins", "KaakAndBreadsticks"],

  Coffee: ["ArabicCoffee", "CapsulesAndPods"], 
  FitnessDrinks: ["ProteinDrinks", "ShotsAndBoosters"], 

  Chocolate: ["ChocolateBars"], 
  CookiesAndBiscuits: [],

  Butter: [], 
  Cheese: [], 

  FrozenFishAndSeafood: [], 
  FrozenFruitsAndVegetables: [],

  FreshFruits: [], 
  FreshVegetables: [],

  FishAndSeafood: [], 
  Meat: [], 

  BakingDecorations: [], 
  BakingIngredients: [],

  BabyBath: [], 
  BabyHealthCareAndGrooming: [],

  BabyClothing: [], 
  BabyClothingAccessories: [],

  BabyDiapers: [], 
  ChangingPads: [],

  BabyFeeding: [], 
  BabyFood: [],

  Activity: [], 
  ChairsAndSeats: [],

  BabyBeddings: [], 
  BabyFurniture: [],

  MakeupToolsAndAccessories: [], 
  NailCareTools: [], 

  Perfumes: [],

  BodyArt: [], 
  BodyMakeup: [], 

  NailArt: [], 
  NailCareProducts: [],

  EyeCare: [], 
  FaceCare: [],

  CleaningAppliances: [], 
  CoffeeAndEspressoMachines: [],

  BarFurniture: [], 
  HairSalonFurniture: [],

  BBQAndGrills: [], 
  GardenDecor: [],

  ArtworkAndFrames: [], 
  Clocks: [],
   
  Bedrooms: [], 
  DiningRooms: [],

  Bedding: [],
  CarpetsAndRugs: [],

  BathroomAccessories: [], 
  CleaningSupplies: [],

  Bakeware: [], 
  CoffeeAndTeaTools: [],

  Printers3D: [],

  AgriculturalMachineryParts: [],
  AgriculturalSprayer: [],

  ApparelAndTextileMachineryParts: [], 
  ApparelMachinery: [],

  ChemicalMachineryAndEquipment: [], 
  CosmeticsProductionEquipment: [],

  AirCleaningEquipment: [],
  CleaningEquipmentParts: [],

  AbrasiveMachines: [], 
  BuildingMaterialMachinery: [],

  BakingEquipment: [], 
  BeanProductProcessingMachinery: [],

  AuxiliaryPackagingMachines: [],
  BlisterPackahingMachines: [],

  FoamCuttingMachine: [], 
  FoamMachinery: [],

  ArtAndCraftPaper: [], 
  ArtAndCraftSets: [],

  BoardAccessories: [], 
  BulletinBoards: [],

  BookReaders: [],
  ChildrensBooks: [],

  BinsAndBaskets: [], 
  BusinessCardsAndOrganizers: [],

  DividersAndBookmarks: [], 
  DocumentBagsAndDisplayBooks: [],

  Batteries: [], 
  BinderClipsAndPins: [],

  CabinetsAndDrawerUnits: [], 
  ChairsAndSeating: [],

  AttendanceMachines: [],
  BindingMachines: [],
 
  GiftBagsBoxesAndWraps: [],
  PackagingPaperAndWraps: [],

  AddressLabels: [],
  BarcodeLabels: [],

  ColorPaper: [], 
  CopyPaper: [],

  DuctTapes: [],
  GluesAndAdhesives: [],

  InkCartridges: [],
  TonersCartridges: [],

  CorrectionPensAndFluids: [],
  GeometryAndScienceSupplies: [],

  AddressAndAccountingBooks: [], 
  CalendarJournalAndDiaries: [],

  HairAccessories: [],
  HairCare: [],

  BathAndBody: [],
  HairSalonDisposables: [], 

  HairStylingTools: [], 
  ShavingAndHairRemovalTools: [],

  AnimalFeedsAndSupplements: [],

  CleaningSupplies: [], 
  CollarsAndLeashes: [],

  Chews: [],
  DryFoods: [], 

  Aquariums: [],  
  Beds: [],
  
  ExerciseMachines: [],  
  FitnessAccessories: [],

  BallGames: [],  
  BikePartsAndTools: [],

  WaterSportShoes: [],

  WaterSportsAndActivities: [],

  AdventCalendars: [],  
  CraftSets: [],

  BabyGymsAndPlaymats: [],  
  BabyToys: [],

  RemoteControlToys: [],

  BuildingBlocks: [],  
  BuildingToys: [],

  DollhousesAndAccessories: [],  
  Dolls: [],

  LanguageAndLiteracy: [],  
  MathAndCountToys: [],

  SoundAndLightToys: [],

  FidgetToys: [],
  SquishyToys: [],

  BeachToys: [], 
  BikesScootersAndRideOns: [],

  AnimalAndActionFigures: [], 
  VehicleToys: [],

  DressingUpAndCostumes: [],
  PretendPlay: [],

  Games: [],
  Puzzles: [],

  BathroomAndKitchenAccessories: [],
  SinksVanitiesAndCabinets: [],

  BuildingBoards: [], 
  BuildingGlassAndAccessories: [],


  DoorAndWindowHardware: [], 
  Doors: [],

  CablesWiresAndAccessories: [], 
  FusesAndCircuitBreakers: [],

  AdhesivesAndFillers: [], 
  PaintAndCoating: [],

  IndoorLighting: [],
  OutdoorLighting: [],

  Alarms: [], 
  ChildSafety: [],

  DimensionalAndLevelMeasurement: [],
  ElectricalMeasurement: [],

  Fasteners: [], 
  FurnitureHardware: [],

  sweetgray: [],
  sourgray: [],
  sweetpink: [],
  sourpink: [],
};


export { supOptions, subOptions, miniSubOptions, microSubOptions }