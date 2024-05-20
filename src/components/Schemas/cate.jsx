

const supOptions = [ "ConsumerElectronics", "FashionAndAccessories", "Automotive", "FoodAndBeverages", "BabyCenter", "BeautyAndFragrances", "HomeGardenAndFurniture", "MachineryAndEquipment", "OfficeAndStationery", "PersonalCare", "PetAndAnimalCare", "SportsAndFitness", "Toys", "ToolsAndHomeImprovement" ];


const subOptions = {

  ConsumerElectronics: ["AudioAndStudio", "CamerasAndCamcorders", "ComputersAndAccessories", "ElectricalAndElectronicAccessories", "GamingAndConsoles", "MobilePhonesAndTablets", "MusicalInstruments", "ProjectorsAndAccessories", "SmartHomeSolutions", "TelephonesAndCommunication", "TelevisionsAndStreamingDevices", "Wearables"],
  FashionAndAccessories: ["Bags", "Clothing", "Eyewear", "Footwear", "WatchesAndJewelry"],
  Automotive: ["AutomotiveCareAndCleaning", "AutomotivePartsAndAccessories", "GarageAndWorkshop", "OilsAndFluids", "RecoveryAndOffRoadAccessories", "WheelsTiresAndAccessories" ],
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

};

const miniSubOptions = {

  AudioAndStudio: ["AmplifiersAndSpeakers", "AudioAndVideoAccessories", "HeadphonesAndHeadsets", "MediaPlayers", "Radio", "RecordingAndStudioEquipment"],
  CamerasAndCamcorders: ["Camcorders", "CameraAccessories", "DigitalCameras", "InstantAndFilmCameras", "SecurityCamerasAndDrones", "WebcamsAndAccessories"],
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

  AutomotiveCareAndCleaning: ["AutomotiveCleaningTools", "ExteriorCare"],
  AutomotivePartsAndAccessories: ["ATVUTVPartsAndAccessories", "AviationPartsAndAccessories"],
  GarageAndWorkshop: ["RepairEquipment"],
  OilsAndFluids: ["FluidFlushes", "GreasesAndLubricants"],
  RecoveryAndOffRoadAccessories: ["EmergencyTools", "TowingAndWinches"],
  WheelsTiresAndAccessories: ["CommercialWheelsAndTires", "MotorcycleScooterWheelsAndTires"],

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
  
};

const microSubOptions = {

  AmplifiersAndSpeakers: ["Amplifiers", "Boomboxes", "CeilingSpeakers", "ComputerSpeakers", "FloorStandSpeakers", "Loudspeakers", "MonitorSpeakers", "OutdoorSpeakers", "PortableSpeakers", "SoundbarSpeakers", "Subwoofers", "WallMountSpeakers"],
  AudioAndVideoAccessories: ["AudioAndVideoSplitters", "AudioConverters", "AudioFiltersAndEqualizers", "AudioInterfaces", "AudioMixers", "MountsAndHolders", "SpeakerMountsAndStands", "VideoConverters", "VideoSwitchers"],
  HeadphonesAndHeadsets: ["HeadphoneAccessories", "Headphones", "Headsets", "WirelessEarbuds"],
  MediaPlayers: ["BluRayPlayers", "CDPlayersAndRecorders", "DVDPlayersAndRecorders", "MP3AndMP4Players", "StereoSystems", "TurntablesAndRecordPlayers"],
  Radio: ["AnalogRadios", "ClockRadios", "DigitalRadios"],
  RecordingAndStudioEquipment: ["KaraokeSystems", "MicrophoneCovers", "MicrophoneFilters", "Microphones", "VoiceRecorders"],

  Camcorders: ["DVDCamcorders", "FlashMemoryCamcorders", "HDDCamcorders", "Mini-DVCamcorders"], 
  CameraAccessories: ["AccessoriesSets", "CameraBagsCoversAndCases", "CameraChargersAndBatteries", "CameraFilms", "CameraFiltersAndProtectors", "CameraLenses", "CameraStrapsHolders", "ClapperBoards", "DigitalPhotoFrames", "FlashesAndLighting", "Gimbals", "LensCapsAndHoods", "LensCleaningKits", "Sliders", "StudioBackgrounds", "TripodAndMonopodAccessories", "TripodsAndMonopods"],
  DigitalCameras: ["360-DegreeCameras", "Action Cameras", "CompactDigitalCameras", "DSLRCameras", "MirrorlessCameras"],
  InstantAndFilmCameras: ["FilmCameras", "InstantCameras"],
  SecurityCamerasAndDrones: ["BinocularsAndTelescopes", "Drones", "SecurityCameras", "SurveillanceSystems"],
  WebcamsAndAccessories: ["WebcamCovers", "Webcams"],

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

  AutomotiveCleaningTools: ["Applicators", "CleaningToolsAndKits"],
  ExteriorCare: ["AutomotiveGlassCare", "AutomotivePolishesAndWaxes"],
  ATVUTVPartsAndAccessories: ["ATVUTVAccessories", "ATVUTVParts"],
  AviationPartsAndAccessories: ["AviationAccessories", "AviationParts"],
  RepairEquipment: ["BodyRepairTools", "CreepersAndRollerSeats"],
  FluidFlushes: ["AutomaticTransmissionFluids", "BrakeFluids"],
  GreasesAndLubricants: ["GreaseAdditives", "Greases"],
  EmergencyTools: ["CarEmergencyEquipment", "JerryCans"],
  TowingAndWinches: ["HitchHooks", "HitchMounts"],
  CommercialWheelsAndTires: ["RVTires", "RVWheels"],
  MotorcycleScooterWheelsAndTires: ["MotorcycleTires", "MotorcycleWheels"],

  BreadAndWraps: ["BunsAndRolls", "Flatbread"],
  Pastry: ["CakesAndMuffins", "KaakAndBreadsticks"],

  Coffee: ["ArabicCoffee", "CapsulesAndPods"], 
  FitnessDrinks: ["ProteinDrinks", "ShotsAndBoosters"], 

  Chocolate: ["ChocolateBars", "ChocolateCandies"], 
  CookiesAndBiscuits: ["Biscuits", "Cookies"],

  Butter: ["ButterBlocks", "ButterRolls"], 
  Cheese: ["BlueCheese", "Cheddar"], 

  FrozenFishAndSeafood: ["FrozenFish", "FrozenSeafood"], 
  FrozenFruitsAndVegetables: ["FrozenFruits", "FrozenVegetables"],

  FreshFruits: ["ApplesAndPears", "ApricotsAndPlums"], 
  FreshVegetables: ["BeansAndPeas", "EdiblePlantStem"],

  FishAndSeafood: ["Fish", "Seafood"], 
  Meat: ["Beef", "Camel"], 

  BakingDecorations: ["BakingCoatings", "BakingFillings"], 
  BakingIngredients: ["BakingMix", "BakingPowderAndSoda"], 

  BabyBath: ["BabyBathAccessories", "BabyBathSeatsAndStands"], 
  BabyHealthCareAndGrooming: ["BabyCombsAndBrushes", "BabyCottonPadsAndBuds"],

  BabyClothing: ["BabyCapsBeaniesAndScarfs", "BabyClothingSets"], 
  BabyClothingAccessories: ["BabyBellyWarmers", "BabyHairAccessories"],

  BabyDiapers: ["DisposableBabyDiapers", "ReusableBabyDiapers"], 
  ChangingPads: ["ChangingPadsAndMats", "WaterproofSheets"],

  BabyFeeding: ["BabyCups", "BabyFeeders"], 
  BabyFood: ["BabyCerealsAndMeals", "BabyFormula"],

  Activity: ["BabyBouncersAndSwings", "BabyGymsAndPlaymats"], 
  ChairsAndSeats: ["HighchairsAndFeedingBoosters", "ToddlerChairsAndSofas"],

  BabyBeddings: ["BabyBlanketsAndSwaddles", "BabyComforterSets"], 
  BabyFurniture: ["BabyDrawersAndShelves", "BabyMattresses"],

  MakeupToolsAndAccessories: ["BlottingPaper", "EyebrowRazors"], 
  NailCareTools: ["CallusRemover", "ElectricNailDrills"], 

  Perfumes: ["BodySpraysAndMists", "FragranceGiftSets"],

  BodyArt: ["TattooStencils", "TattooTools"], 
  BodyMakeup: ["BodyBronzers", "BodyConcealers"], 

  NailArt: ["FalseNailsAdhesives", "NailArtTemplates"], 
  NailCareProducts: ["CuticleRemover", "NailPolish"],

  EyeCare: ["EyeCreamsAndGel", "EyeMakeupRemovers"], 
  FaceCare: ["FaceCareSets", "FaceCreamsAndMoisturizers"],

  CleaningAppliances: ["ElectricDeepCleaners", "ElectricFloorCleaners"], 
  CoffeeAndEspressoMachines: ["CoffeeBeanGrinders", "CoffeeMachines"],

  BarFurniture: ["BarChairsAndStools", "BarTables"], 
  HairSalonFurniture: ["HairdressingChairs", "NailCareChairs"], 

  BBQAndGrills: ["BBQAccessories", "BBQCleaningTools"], 
  GardenDecor: ["ArchesAndArbors", "CobblesAndPebbles"],

  ArtworkAndFrames: ["ArtCards", "Mosaics"], 
  Clocks: ["FloorClocks", "SpecialtyClocks"], 
   
  Bedrooms: ["BedBases", "BedroomSets"], 
  DiningRooms: ["DiningChairs", "DiningTableSets"], 

  Bedding: ["BedSheets", "BedSkirts"],
  CarpetsAndRugs: ["Carpets", "Doormats"],

  BathroomAccessories: ["BathMats", "BathTowels"], 
  CleaningSupplies: ["AirFresheners", "BathroomCleaners"],

  Bakeware: ["BakewareSets", "BakingAndPastryTools"], 
  CoffeeAndTeaTools: ["CoffeeFilters", "CoffeePots"],

  Printers3D: ["Printers3D"],

  AgriculturalMachineryParts: ["AgriculturalMachineryParts"],
  AgriculturalSprayer: ["AgriculturalSprayer"],

  ApparelAndTextileMachineryParts: ["ApparelMachineParts", "CapMakingMachineParts"], 
  ApparelMachinery: ["ButtonMakingMachines", "ButtonholeMachines"],

  ChemicalMachineryAndEquipment: ["3DBlu-rayPlayer", "ChemicalMachineParts"], 
  CosmeticsProductionEquipment: ["CosmeticsProductionEquipment"],

  AirCleaningEquipment: ["AirCleaningEquipmentParts", "AirShower"],
  CleaningEquipmentParts: ["CleaningEquipmentParts"],

  AbrasiveMachines: ["AbrasiveMachines"], 
  BuildingMaterialMachinery: ["BoardMakingMachinery", "BrickMakingMachinery"],

  BakingEquipment: ["BakingOven", "BreadMakingMachine"], 
  BeanProductProcessingMachinery: ["BeanProductProcessingMachinery"], 

  AuxiliaryPackagingMachines: ["AuxiliaryPackagingMachines"],
  BlisterPackahingMachines: ["BlisterPackahingMachines"],

  FoamCuttingMachine: ["FoamCuttingMachine"], 
  FoamMachinery: ["FoamMachinery"],

  ArtAndCraftPaper: ["ArtAndCraftPaper"], 
  ArtAndCraftSets: ["ArtAndCraftSets"],

  BoardAccessories: ["BoardAccessories"], 
  BulletinBoards: ["BulletinBoards"],

  BookReaders: ["BookReaders"],
  ChildrensBooks: ["ActivityBooksAndGames", "AnimalsAndPets"],

  BinsAndBaskets: ["BinsAndBaskets"], 
  BusinessCardsAndOrganizers: ["BusinessCardsAndOrganizers"],

  DividersAndBookmarks: ["DividersAndBookmarks"], 
  DocumentBagsAndDisplayBooks: ["DocumentBagsAndDisplayBooks"],

  Batteries: ["Batteries"], 
  BinderClipsAndPins: ["BinderClipsAndPins"],

  CabinetsAndDrawerUnits: ["Bookcases", "Cabinets"], 
  ChairsAndSeating: ["ChairMatsAndAccessories", "DeskChairs"],

  AttendanceMachines: ["AttendanceMachines"],
  BindingMachines: ["BindingMachines"],
 
  GiftBagsBoxesAndWraps: ["GiftBagsBoxesAndWraps"],
  PackagingPaperAndWraps: ["PackagingPaperAndWraps"],

  AddressLabels: ["AddressLabels"],
  BarcodeLabels: ["BarcodeLabels"],

  ColorPaper: ["ColorPaper"], 
  CopyPaper: ["CopyPaper"],

  DuctTapes: ["DuctTapes"],
  GluesAndAdhesives: ["GluesAndAdhesives"],

  InkCartridges: ["InkCartridges"],
  TonersCartridges: ["TonersCartridges"],

  CorrectionPensAndFluids: ["CorrectionPensAndFluids"],
  GeometryAndScienceSupplies: ["GeometryAndScienceSupplies"],

  AddressAndAccountingBooks: ["AddressAndAccountingBooks"], 
  CalendarJournalAndDiaries: ["CalendarJournalAndDiaries"],

  HairAccessories: ["HairClips", "HairPins"],
  HairCare: ["BeardCare", "Conditioner"],

  BathAndBody: ["BathAccessories", "BodyCreamsLotionsAndMoisturizers"],
  HairSalonDisposables: ["DisposableAccessories", "DisposableBedRolls"], 

  HairStylingTools: ["CurlingIrons", "ElectricHairBrushes"], 
  ShavingAndHairRemovalTools: ["ElectricHairRemovalDevices"],

  AnimalFeedsAndSupplements: ["AnimalFeedsAndSupplements"],

  CleaningSupplies: ["CleaningSupplies"], 
  CollarsAndLeashes: ["CollarsAndLeashes"],

  Chews: ["Chews"],
  DryFoods: ["DryFoods"], 

  Aquariums: ["Aquariums"],  
  Beds: ["Beds"],
  
  ExerciseMachines: ["EllipticalTrainers", "ExerciseBikes"],  
  FitnessAccessories: ["BalanceBoard", "Blocks"],

  BallGames: ["AmericanFootball", "BaseballAndSoftball"],  
  BikePartsAndTools: ["BikeAirPumps", "BikeBasketsAndBags"],   

  WaterSportShoes: ["WaterSportShoes"],

  WaterSportsAndActivities: ["WaterSportsAndActivities"],

  AdventCalendars: ["AdventCalendars"],  
  CraftSets: ["BeadAccessoriesSets", "CandlesMakingSets"],  

  BabyGymsAndPlaymats: ["MusicAndLightPlaymats", "PianoPlaymats"],  
  BabyToys: ["Rattles", "SoftToys"],

  RemoteControlToys: ["RemoteControlAirplanesHelicopters", "RemoteControlAnimals"],

  BuildingBlocks: ["FoamBlocks", "LegoAndBricks"],  
  BuildingToys: ["ModelBuildingToys"],

  DollhousesAndAccessories: ["DollAccessories", "DollStrollers"],  
  Dolls: ["BabyDolls", "FashionDolls"],

  LanguageAndLiteracy: ["AlphabetFlashcards", "KidsLaptops"],  
  MathAndCountToys: ["MagneticNumbers", "MathLearningBooks"],

  SoundAndLightToys: ["DancingToys", "MusicalInstruments"],

  FidgetToys: ["FidgetToys"],
  SquishyToys: ["SquishyToys"],

  BeachToys: ["BeachBalls", "Kites"], 
  BikesScootersAndRideOns: ["Bicycles", "Helmets"],

  AnimalAndActionFigures: ["ActionFigures", "AnimalFigures"], 
  VehicleToys: ["Bikes", "Buses"],

  DressingUpAndCostumes: ["Accessories", "Costumes"],
  PretendPlay: ["BeautyPlaysets", "DoctorPlaysets"],

  Games: ["BoardGames", "CardGames"],
  Puzzles: ["Puzzles3D", "BrainTeasers"],

  BathroomAndKitchenAccessories: ["BathroomRacksAndHolders", "DrainStrainersPlugsAndCovers"],
  SinksVanitiesAndCabinets: ["BathroomCabinets", "BathroomMirrors"],

  BuildingBoards: ["AluminumBoards", "Cementboards"], 
  BuildingGlassAndAccessories: ["ClearGlass", "CurtainWallAccessories"],

  DoorAndWindowHardware: ["DoorAndWindowRollerWheels", "DoorFrames"], 
  Doors: ["AutomaticDoors", "FoldingDoors"],

  CablesWiresAndAccessories: ["CableClipsTiesAndWraps", "CableConduitsAndTrunks"], 
  FusesAndCircuitBreakers: ["ElectricalCircuitBreakers", "ElectricalCircuitBreakers"],

  AdhesivesAndFillers: ["CaulkAndSealant", "Glue"], 
  PaintAndCoating: ["AutomotivePaintAndCoating", "DecorativePaintAndCoating"], 

  IndoorLighting: ["BathroomLighting", "CeilingLights"],
  OutdoorLighting: ["CampingLights", "DeckLights"],

  Alarms: ["AlarmSystems", "GlassBreakDetectors"], 
  ChildSafety: ["AntiSlipsANdUnderlays", "CabinetLocksAndStraps"],

  DimensionalAndLevelMeasurement: ["Calipers", "Micrometers"],
  ElectricalMeasurement: ["CurrentAndVoltageMeters", "EMFMeters"],

  Fasteners: ["Bolts", "Nuts"], 
  FurnitureHardware: ["CasterAndRollerWheels", "Dampers"],

};

export { supOptions, subOptions, miniSubOptions, microSubOptions }

