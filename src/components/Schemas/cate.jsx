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
  ComputersAndAccessories: ["ComputerAndLaptopComponents", "ComputerAccessories","DextopAndComputer","KeyboardsAndKepads","LaptopAndNotebookAccess","LaptopsAndNotebooks","Monitors","Mouse","NetworkAndSecurity","PosSystems","Softwares",'StorageDevice'],
  ElectricalAndElectronicAccessories: ["Adapters", "CablesAndConnectors"],
  GamingAndConsoles: ["GamingAccessories", "GamingConsoles","GamingTitles"],
  MobilePhonesAndTablets: ["ChargersAndBatteries", "MobilePhoneAndTabletAccessories","MobilePhones","Tablets"],
  MusicalInstruments: ["KeyboardInstruments", "PercussionInstruments",'StringedInstruments',"WindInstruments"],
  ProjectorsAndAccessories: ["ProjectorAccessories", "Projectors"],
  SmartHomeSolutions: ["SmartDevices", "SmartHomeDevices"],
  TelephonesAndCommunication: ["CommunicationAccessories", "Telephones"],
  TelevisionsAndStreamingDevices: ["DigitalDisplays", "HomeEntertainmentSystems","StreamingDevices","TvAccessories","Televisions"],
  Wearables: ["FitnessTrackersAndAccessories", "SmartWatchesAndAccessories","VirtualReality"],

  Bags: ["CasualBags", "FashionBags", "FormalBags", "Luggage", "SportBags", "TravelAccessories", "WalletsAndPurses"], 
  Clothing: ["Accessories", "Beachwear", "Bottoms", "Costumes", "DressesAndKaftans", "FormalWear", "JacketsAndCoats", "JumpsuitsAndPlaysuits", "KidsAccessories", "KidsBottoms", "KidsJumpsuitsAndSets", "KidsSleepwear", "KidsSportswear", "kidsSwimwear", "KidsTops", "KidsUnderWear", "MaternityWear", "SleepWear", "SocksAndTights", "Sportswear", "Tops", "TraditionalWear", "UnderWear", "Uniforms"], 
  Eyewear: ["ContactLenses", "Glasses", "GlassesAccessories"], 
  Footwear: ["KidsShoes", "Shoes", "ShoesAccessories"], 
  WatchesAndJewelry: ["JewelryAndAccessories", "Watches"],

  AutomotiveCareAndCleaning: ["AutomotiveCleaningTools", "ExteriorCare", "InteriorCare"],
  AutomotivePartsAndAccessories: ["ATVUTVPartsAndAccessories", "AviationPartsAndAccessories", "BusPartsAndAccessories", "CarBodyParts", "CarBrakeSystems", "CarElectricalSystems", "CarElectronics", "CarEngineSystems", "CarExhaustSystems", "CarExteriorAccessories", "CarHvacSystems", "CarInteriorAccessories", "CarLightingSystems", "CarSuspensionSystems", "CarTransmissionSystems", "ContainerAndTrailerPartsAndAccessories", "Go-KartPartsAndAccessories", "HeavyDutyVehiclePartsAndAccessories", "MarinePartsAndAccessories", "MotorcycleAndScooterPartsAndAccessories", "NewEnergyVehiclePartsAndAccessories", "RVPartsAndAccessories", "TrainAndRailwayPartsAndAccessories", "TruckPartsAndAccessories"],
  GarageAndWorkshop: ["RepairEquipment"],
  OilsAndFluids: ["FluidFlushes", "GreasesAndLubricants", "Oils"],
  RecoveryAndOffRoadAccessories: ["EmergencyTools", "TowingAndWinches"],
  WheelsTiresAndAccessories: ["CommercialWheelsAndTires", "MotorcycleScooterWheelsAndTires", "PassengerCarAndOffRoadWheelsAndTires", "WheelPartsAndAccessories"],

  BakeryAndPastry: ["BreadAndWraps", "Pastry"],
  Beverages: ["Coffee", "FitnessDrinks"], 
  Confectionery: ["Chocolate", "CookiesAndBiscuits"], 
  DairyAndEggs: ["Butter", "Cheese"], 
  FrozenFood: ["FrozenFishAndSeafood", "FrozenFruitsAndVegetables"], 
  FruitAndVegetables: ["FreshFruits", "FreshVegetables"], 
  MeatPoultryAndFish: ["FishAndSeafood", "Meat"], 
  Pantry: ["BakingDecorations", "BakingIngredients"],

  BabyCare: ["BabyBath", "BabyHealthCareAndGrooming", "BabySafety", "BabySkinCare"], 
  BabyClothingAndFootwear: ["BabyClothing", "BabyClothingAccessories", "BabyFootwear"], 
  BabyDiapering: ["BabyDiapers", "ChangingPads", "DiaperingAccessories", "PottyTraining"], 
  BabyFeedingAndNursing: ["BabyFeeding", "BabyFood", "BibsAndBurpCloths", "BottleFeeding", "Breastfeeding", "PacifiersAndTeethers"], 
  BabyGear: ["Activity", "ChairsAndSeats", "StrollersAndCarSeats", "Travel"], 
  BabyNursery: ["BabyBeddings", "BabyFurniture"], 

  BeautyTools: ["MakeupToolsAndAccessories", "NailCareTools", "SkincareTools"], 
  Fragrances: ["Perfumes"], 
  Makeup: ["BodyArt", "BodyMakeup", "EyeMakeup", "EyebrowMakeup", "FaceMakeup", "Lips"], 
  Nails: ["NailArt", "NailCareProducts"],
  Skincare: ["EyeCare", "FaceCare", "LipCare", "SunCareAndTanning"],

  Appliances: ["CleaningAppliances", "CoffeeAndEspressoMachines","CollingAppliances","HeatingAppliances","LargeKitchenApliances","LaundaryAppliances","SmallKitchenAppliances"], 
  CommercialFurniture: ["BarFurniture", "HairSalonFurniture","HairSalonFurniture","healthAndMedicalFurniture","HotelFurniture","RestaurantFurniture","SchoolFurniture"], 
  GardenAndOutdoor: ["BBQAndGrills", "GardenDecor","GardeningTools","OutdoorFurniture","PestControl","WateringAndIrrigation"], 
  HomeDecor: ["ArtworkAndFrames", "Clocks","DecorativeAccessories","HomeFragrances","Islamic","Mirrors","PartySupplies"], 
  HomeFurniture: ["Bedrooms", "DiningRooms","KidsAndBabyFurniture","KitchenFurniture","LivingRooms"], 
  HomeTextiles: ["Bedding", "CarpetsAndRugs","CurtainsAndBlinds"], 
  HouseholdSupplies: ["BathroomAccessories", "CleaningSupplies","CleaningTools","DisposableHygieneProducts","DisposableTableWare","HomeStorageAndOrganisation","KitchenEssentials","KitchenLines","KitchenStorageAndOrganisation","LaundryStorageAndOrganisation","PhotoAlbums","SewingAndAccessories","StorageAndOrganisation","TableEssentials"], 
  KitchenAndDining: ["Bakeware", "CoffeeAndTeaTools","Cookware","Dinnerware","Drinkware","KitchenKnivesAndAccessories","KitchenToolsAndUtensils","Tableware"], 

  Printers3D: ["Printers3D"], 
  AgriculturalMachineryEquipment: ["AgriculturalMachineryParts", "AgriculturalSprayer","AnimalAndPoultrHusbandrEquipment","AquacultureMachineAerators","Balers","BiomassBriquetteMachines","BiomassDryers","CompostMakingMachines","Cultivators","EggIncubators","FarmIrrigationSystem","FarmTrailer","FeedProcessingMachines","FertilizerSpreaders","ForestryMachinery","Harvesters","IndoorFarmingAndHydroponicsMachines","IrrigationEquipment","MilkingMachines","OilPressers","OtherAgriculturalMachineryAndEquipments","OtherFarmMachines","SeedProcessingMachines","Seeders","Shellers","Silos","SlaughteringEquipment","TowableBachoe","Tractors"], 
  ApparelAndTextileMachinery: ["ApparelAndTextileMachineryParts", "ApparelMachinery","CapMakingMachines","HomeTextileProduct","IroningAndWashingEquipments","LeatherProductionMachinery","ShoeMakingMachines","TextileMachinery"], 
  ChemicalAndPharmaceuticalMachinery: ["ChemicalMachineryAndEquipment", "CosmeticsProductionEquipment","Crystalizer","PharmaceuticalMachinery"], 
  CleaningAndFiltrationMachinery: ["AirCleaningEquipment", "CleaningEquipmentParts","CornerCleaningMachines","DishwashingEquipments","FiltrationEquipment"], 
  EngineeringAndConstructionMachinery: ["AbrasiveMachines", "BuildingMaterialMachinery","ConcreteMachinery","ConstructionLifter","ConstructionMachinery","Cranes","CuttingMachines","DrillingMachines","EarthMovingMachines","ElectronicsProductionsMachinery","GaugesIndicatorsAndMeter","MortarSprayMachines","MunicipalMachinery","OtherConstructionMachinery","PileDriver","PipeJackingMachines","PolishingMachines","Rammers","RenderingMachines","RoadMachinery","ScientificLabEquipment","TestingMachines","TransformerMakingEquipment"], 
  FoodAndBeverageMachinery: ["BakingEquipment", "BeanProductProcessingMachinery","BakingEquipment","BeanProductPRocessingMachinery","BeverageProcessingMachines","CoffeeMachine","DairyProcessingMachine","FishProcessingMachines","FoodProcessingMachines","FoodSterlizer","FruitAndVegetableProcessingMachines","Fryer","GrainProcessingMachines","GrainProductMakingMachines","HoneyProcessingMachines","KitchenMachines","MeatProcessingMachine","MeatProductionMakingMachines","NutsProcessingMachines","OtherFoodProcessing","Pasteurizer","PetFoodProcessingMachines","SeasoningProcessing","SnackMacine"], 
  PackagingMachine: ["AuxiliaryPackagingMachines", "BlisterPackahingMachines","BoxingMachine","CappingMachines","CoatingMachines","EmbossingMachines","FillingMachines","GluingMachines","LabelingMachines","LaminatingMachines","MultiFunctionPackagingMachines","OtherPackaginMachines","PackagingFormingMachines","PackagingLine","PackagingMachinery","PackagingMateialMachines","SealingMachines","VacuumPackagingMachines","WrappingMachines"],
  PlasticAndRubberProcessingMachinery: ["FoamCuttingMachine", "FoamMachinery","InjectionMoldingMachines","OtherPlasticProductMakingMachinery","OtherPlasticAndRubberMachinery","PipeBellingMachines","PlasticAndRubberMachinery","PlasticAuxiliaryEquipment","PlasticBowlingMachinery","PlasticCuttingMachinery","PlasticExtruders","PlasticFlockingMachinery","PlasticLaminatingMachinery","PlasticRawMaterialMachinery","PlasticRecyclingMachinery","PlasticRotationalMoldingMachines","PlasticThermoformingMachines","RubberPRocessingMachines","RubberProductMakingMachines","RubberRecyclingMach"], 

  ArtAndCrafts: ["ArtAndCraftPaper", "ArtAndCraftSets","BeadsSequinsAndGlitter","CanvasAndArtPads","CraftAccessories","CuttingTools","GlueGunsAndSticks","MeasuringTools","PaintAndColors","PaintBrushes","Palettes","SewingTools","YarnAndThreads"], 
  BoardsAndEasels: ["BoardAccessories", "BulletinBoards","ChalkBoards","EaselsAndEaselPads","GlassBoards","WhiteBoards"], 
  Books: ["BookReaders", "ChildrensBooks","Fiction","NonFiction"], 
  DeskSupplies: ["BinsAndBaskets", "BusinessCardsAndOrganizers","DeskOrganizersAndAccessories","DocumentTraysAndDrawing","PenMemoAndClipHolders"], 
  FilesAndFolders: ["DividersAndBookmarks", "DocumentBagsAndDisplayBooks","FileStorage","HangingAndExpandingFiles","LaminatingFilms","LeverArchAndBoxFiles","RingBindersAndViewBinder","SuspensionAndReportFiles"], 
  GeneralSupplies: ["Batteries", "BinderClipsAndPins","Clipboards","Envelopes","GeneralAccessories","KeyBoxAndAccessories","NameBadgesAndLanyari","Punchers","RubberBands","Rulers","Scissors","SignsLabelsAndStickers","StampsAndSeals","StaplesAndStaplers"], 
  OfficeFurniture: ["CabinetsAndDrawerUnits", "ChairsAndSeating","OfficeDesksAndTables"], 
  OfficeMachinesAndEquipments: ["AttendanceMachines", "BindingMachines","Calculators","CashHandlingMachines","Laminators","PaperTrimmers&Cutt","Safes","Shredders"], 
  PackagingMaterial: ["GiftBagsBoxesAndWraps", "PackagingPaperAndWraps","PackagingPouchAndBox"], 
  PrintersScannersAndLabelMachines: ["AddressLabels", "BarcodeLabels","DotMatrixPrinters","IdCardPrinters","InkJetPrinters","LabelMakers","LaserJetPrinter","PrintersAndScannersAccessories","Scanners","ShippingLabels"], 
  PrintingPaper: ["ColorPaper", "CopyPaper","PaperRolls","SpecialtyPaper"], 
  TapesAndAdhesives: ["DuctTapes", "GluesAndAdhesives","MaskingTapes","PackingTapes","SpecialtyTapes","TapeDispensers","TransparentTapes"], 
  TonersAndInkCartridges: ["InkCartridges", "TonersCartridges"], 
  WritingInstruments: ["CorrectionPensAndFluids", "GeometryAndScienceSupplies","MarkersAndHighlighter","PencilsAndLead","Pens","SharpencersAndErasers","WritingAccessories"], 
  WritingMaterial: ["AddressAndAccountingBooks", "CalendarJournalAndDiaries","NotebooksAndWritingPads","StickyNotesAndNoteCards"],

  Hair: ["HairAccessories", "HairCare","HairColoring","HairStylingProducts"], 
  PersonalCare: ["BathAndBody", "HairSalonDisposables","MassageAndRelaxation","OralAndDentalCare","ShavingAndHairRemovalProducts"], 
  PersonalCareTools: ["HairStylingTools", "ShavingAndHairRemovalTools"], 

  AnimalFeedsAndSupplements: ["AnimalFeedsAndSupplements",""], 
  PetAndAnimalsSupplies: ["CleaningSupplies", "CollarsAndLeashes","FeedingAndWateringSupplies","GroomingSupplies","HealthSupplies","PetApparelAndAccessories","PetHeatLamps","Toys","TrainingAndBehaviorSupplies"], 
  PetFood: ["Chews", "DryFoods","Milk","Treats","WetFoods"], 
  PetFurniture: ["Aquariums", "Beds","Crates","Gages"],

  FitnessAndTraining: ["ExerciseMachines", "FitnessAccessories","WeightAndResistanceTraining"], 
  SportsAndOutdoorActivities: ["BallGames", "BikePartsAndTools","BikesAndElectricBikes","BoxingRings","CampingAccessories","CampingPersonalCare","CampingTables,Chair","Fishing","OutdoorCookingAndEating","OutdoorRecreation","PunshingBagsAndSpeed","RacketSports","ScootersAndHoverBoards","Skates","SleepingBagsAndBedding","SporsProtectiveGear","TentsAndCanopies"], 
  WaterSportShoes: ["WaterSportShoes"], 
  WaterSportsAndActivities: ["WaterSportsAndActivities"], 
  
  ArtsAndCrafts: ["AdventCalendars", "CraftSets","DrawAndPaint","PlayDoughAndClay","SandAndMoulds"],  
  BabyToddlerToys: ["BabyGymsAndPlaymats", "BabyToys","BathToys","EarlyLearning","FloorMats"], 
  BatteryOperatedToys: ["RemoteControlToys"], 
  ConstructionToys: ["BuildingBlocks", "BuildingToys"], 
  DollsAndDollhouses: ["DollhousesAndAccessories", "Dolls"], 
  LearningAndEducational: ["LanguageAndLiteracy", "MathAndCountToys","ScienceToys","WritingBoards"], 
  MusicalToys: ["SoundAndLightToys"], 
  NoveltyToys: ["FidgetToys", "SquishyToys"], 
  OutdoorAndPlayground: ["BeachToys", "BikesScootersAndRideOns","OutDoorPlay","PlayGroundSet","PoolsAndWaterFun"], 
  PlayFiguresAndVehicles: ["AnimalAndActionFigures", "VehicleToys"], 
  PretendPlayAndCostumes: ["DressingUpAndCostumes", "PretendPlay",""], 
  PuzzlesAndGames: ["Games", "Puzzles"],

  BathroomAndKitchen: ["BathroomAndKitchenAccessories", "SinksVanitiesAndCabinets","BathroomAndKitchenAccessories",'SinksVanitiesAndCabinets',"TapsAndFaucets","ToiletsAndAcessories","Tubs&Showers"], 
  Construction: ["BuildingBoards", "BuildingGlassAndAccessories","BuildingMaterial","Ceiling","ElevatorsAndEscalator","Flooring","handrailsAndBalustrad","LaddersAndScaffolding"], 
  DoorsAndWindows: ["DoorAndWindowHardware", "Doors","Windows"], 
  ElectricalSupplies: ["CablesWiresAndAccessories", "FusesAndCircuitBreakers","PlugsAndSockets","PowerSupplies","RelaysAndControllers","Sitches","TerminalsAndConnectors"], 
  HomeImprovement: ["AdhesivesAndFillers", "PaintAndCoating","PaintAndCoating"], 
  Lighting: ["IndoorLighting", "OutdoorLighting", 'PortableLighting'], 
  SafetyAndSecurity: ["Alarms", "ChildSafety","Firefighting","LocksAndKeys","RoadwaySafety","Surveillance","WaterSafety","WorkplaceSafety"], 
  TestMeasureAndInspect: ["DimensionalAndLevelMeasurement", "ElectricalMeasurement","EmissionMesurement","FlowMeasurement","LabSupplies","MotionForceAndSpeed","NetworkAndCableTesting","PressureMeasurement","SoundAndLightMeasurment","TemperatureAndHumidityMeasurement","WaterAndFoodTesting","WeightMeasurement"], 
  ToolsAndHardware: ["Fasteners", "FurnitureHardware","HandTools","HydraulicTools","PowerTools","ToolORganizers","ToolParts","ValvesPumpsAndPlumbing"],
  
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

  CasualBags: ["BagAccessories", "SchoolBagsAndBackpacks","ShoppingBags","SpecialtyBagsAndBackpacks"], 
  FashionBags: ["BeltBags", "CrossbodyBags", "FashionBackpacks", "HandbagsAndSets", "ShoulderBags"],
  FormalBags: ["Briefcase", "MessangerBags"],
  Luggage:    ["LuggageSets", "TravelBagsAndsuitcase"],
  SportBags: ["SportBagsandBackpacks", "SportWaistBags"],
  TravelAccessories:["GarmentBags", "LuggageCovers", "LuggageLocks", "LuggageScales", "LuggageTags", "PackingOrganizes", "PassportCovers", "TravelDocumentHolders", "Umbrellas"],
  WalletsAndPurses:["CardCases", "ChequeBookCovers", "CoinPurses", "Wallets"],


  Accessories: ["BeltsAndSuspenders", "BowsAndTies", "BroochesAndPins", "Buttons", "Gloves", "HatsAndCaps", "PocketSquares", "ScarvesAndWraps"], 
  Beachwear: ["BeachDresses", "Bikinis", "SwimBriefs", "SwimCaps", "SwimDresses", "SwimShorts", "Swimsuits"],
  Bottoms:  ["Jeans", "PantsAndLeggings", "Sports", "Skirts"],
  Costumes: ["Animals", "Bugs", "Characters", "FairytaleAndStorybooks", "HorrorAndGothic", "MoviesAndVideoGames", "PlantsAndFood", "Superhero"],
  DressesAndKaftans:["Dresses", "Kaftans"],
  FormalWear:["Suits", "Tuxedos"],
  JacketsAndCoats:["Blazer", "Coats", "Jackets"],
  JumpsuitsAndPlaysuits:["Jumpsuits", "Playsuits"],
  KidsAccessories:["KidsBeltsAndSuspenders", "KidsGlovesAndScarves", "KidsHatAndCaps", "KidsPursesAndWallets", "KidsSocksAndTights", "KidsSunglasses", "KidsWatchesAndJewellery"],
  KidsBottoms:["KidsJeans", "KidsPantsAndLeggings", "KidsShorts", "KidsSkirts"],
  KidsJumpsuitsAndSets:["KidsCostumes", "KidsJumpsuitsAndRompers", "KidsSets", "KidsSuitsAndTuxedos"],
  KidsSleepwear:["KidsNightDresses", "KidsNightwearSets", "KidsPajamas", "KidsRobes", "KidsSleepingMasks"],
  KidsSportswear:["KidsSportBottoms", "KidsSportTops", "KidsTracksuitsAndSets"],
  kidsSwimwear: ["KidsBikinis", "kidsSwimBriefs", "kidsSwimCaps", "kidsSwimDresses", "kidsSwimShorts", "kidsSwimsuits"],
  KidsTops: ["KidsDresses", "KidsJacketsAndCoats", "KidsShirtsAndBlouses", "KidsSweatshirtsAndKnitwear"],
  KidsUnderwear:["KidsBodysuits", "KidsBoxersAndBriefs", "KidsUndershirts"],
  MaternityWear:["MaternityBottom", "MaternityDresses", "MaternityJumpsuits", "MaternitySleepwear", "MaternitySupports", "MaternityTops", "MaternityUnderwear"],
  Sleepwear:["Lingerie", "NightDressesAndGowns", "NightWearSets", "Pajamas", "Robes", "SleepMasks"],
  SocksAndTights:["SocksAndStockings", "Tights"],
  Sportswear:["SportBottoms", "SportGlovesAndHandwraps", "SportSocks", "SportTops", "SportTrackSuitsAndSets", "SportUnderwear"],
  Tops: ["ShirtsAndBlouses", "SweatshirtsAndKnitwear", "TShirtsAndPolo", "Vests"],
  TraditionalWear: ["AfricanWear", "ArabicAndIslamicWear", "EuropeanWear", "IndianAndPakistaniWear"],
  UnderWear:["Boxers,BriefsAndPanties", "BraAccessories", "Bras", "ShapewearAndBodysuits", "Undershirts"],
  Uniforms: ["ChefsUniforms", "DomesticWorkerUniforms", "MedicalUniforms", "ScoutingUniforms"],


  ContactLenses: ["ColoredContactLenses", "ContactLensesSolutions", "CorrectiveContactLenses"], 
  Glasses: ["EyeglassesFrames", "ReadingGlasses", "Sunglasses"],
  GlassesAccessories:["GlassesCases", "GlassesChains", "GlassesCleaningTools"],

  KidsShoes: ["KidsBoots", "KidsFlats", "KidsSandals", "KidsSlippers", "KidsSportShoes"], 
  Shoes: ["Boots", "CasualShoes", "Flats", "FormalShoes", "Heels", "SandalsAndFloaters", "SlippersAndFlipFlops", "SportShoes"],
  ShoesAccessories: ["Insoles", "ShoeBagsAndCovers", "ShoeBrushes", "ShoePolish", "Shoehorns", "Shoelaces"],

  JewelryAndAccessories: ["Anklets", "Bracelets", "Cufflinks", "DisplayHeadStands", "Earrings", "JewelleryBoxes", "JewellerySets", "Keychains", "LooseGemstonesAndDiamonds", "MoneyClip", "Necklaces", "PendantsAndCharms", "Piercings", "Rings", "Rosaries", "TieBar"], 
  Watches: ["AnalogWatches", "AnalogDigitalWatches", "DigitalWatches", "WatchAccessories"],

  AutomotiveCleaningTools: ["Applicators", "CleaningToolsAndKits"],
  ExteriorCare: ["AutomotiveGlassCare", "AutomotivePolishesAndWaxes", "AutomotiveProtectiveSprays", "AutomotiveRustRemovers", "AutomotiveWashAndCleaners"],
  InteriorCare: ["AutomotiveFresheners", "AutomotiveLeatherCare", "AutomotiveUpholsteryCare"],

  ATVUTVPartsAndAccessories: ["ATVUTVAccessories", "ATVUTVParts"],
  AviationPartsAndAccessories: ["AviationAccessories", "AviationParts"],
  BusPartsAndAccessories:["BusBodyKits", "BusBrakes", "BusEngines", "BusGrabHandles", "BusLights", "BusSeats"],
  CarBodyParts: ["CarBumpers", "CarDashboards", "CarDoors", "CarFenders", "CarGearKnobs", "CarMirrors", "CarPedals", "CarSteeringWheels", "CarWindows", "SeatsAndSeatBelts", "Windshield"],
  CarBrakeSystems:["AutoBrakeCables", "Brakes", "Handbrakes"],
  CarElectricalSystems:["AutoMeters", "AutoSwitches", "CarBatteries", "CarHornsAndSpeakers"],
  CarElectronics:["CarBlackBox", "CarDVDPlayer", "CarDashcams", "CarDisplays", "CarMonitors", "CarRadio", "CarReversingAid", "GPSTrackers", "VehicleKeys"],
  CarEngineSystems:["CarEngines", "CarburetorsAndThrottles", "Filters", "IgnitionCables", "IgnitionCoils", "InjectionValves", "Radiators", "SparkPlugs", "TurbochargersAndSuperchargers"],
  CarExhaustSystems:["CatalyticConverters", "ExhaustManifolds", "ExhaustPipes", "Mufflers", "OxygenSensors", "Resonators", "TailPipes"],
  CarExteriorAccessories:["CarAntennas", "CarCovers", "CarDeflectors", "CarFilms", "CarRoofBoxes", "CarRoofRacks", "CarStickers", "DoorHandles", "RunningBoards", "WindshieldWipers"],
  CarHvacSystems:["ACCompressors", "ACControl", "AirHoses", "AirVentilation", "BlowerFans", "Condensers", "Evaporators", "HeaterCores", "Thermostats"],
  CarInteriorAccessories:["CarClothesHangers", "CarCupHolders", "CarDecoration", "CarKeyAccessories", "CarKickPanels", "CarLocks", "CarMats", "CarOrganizers", "CarSunshades", "CarTrashCans", "CenterConsolesAndArmrests", "SeatCovers", "SeatCushionsAndPillows", "SteeringWheelCovers"],
  CarLightingSystems:["AutoFogLights", "AutoHeadlights", "AutoInteriorLights", "AutoLightBulbs","AutoTailLights",],
  CarSuspensionSystems:["BallJoints", "Bearings", "ControlArms", "RubberMountings", "ShockAbsorberSprings", "ShockAbsorbers", "StabilizerLinks", "SuspensionStruts"],
  CarTransmissionSystems:["ClutchMasterCylinders", "Driveshafts", "Gearboxes", "PropellerShafts", "TensionersAndBelts"],  
  ContainerAndTrailerPartsAndAccessories:["ContainerPartsAndAccessories", "TrailerPartsAndAccessories"],
  GoKartPartsAndAccessories:["GoKartBodyParts", "GoKartBrakeSystems", "GoKartCabinCovers", "GoKartEngines", "GoKartHardware", "GoKartModificationAccessories", "GoKartSeats", "GoKartSteeringWheels"],
  HeavyDutyVehiclePartsAndAccessories:["HeavyDutyVehicleAccessories", "HeavyDutyVehicleParts"],
  MarinePartsAndAccessories:["BoatAnchors", "BoatCovers", "BoatEngines", "MarineHardware", "MarinePropellers", "MarinePumps"],
  MotorcycleAndScooterPartsAndAccessories:["MotorcycleAndScooterAccessories", "MotorcycleAndScooterBodyParts", "MotorcycleAndScooterBrakes", "MotorcycleAndScooterEngines", "MotorcycleAndScooterGauges", "MotorcycleAndScooterHandlebarsAndControls", "MotorcycleAndScooterLights", "MotorcycleAndScooterProtectiveGear", "MotorcycleAndScooterRacks", "MotorcycleAndScooterSeats", "MotorcycleAndScooterSuspensionSystems"],
  NewEnergyVehiclePartsAndAccessories:["DC/DCConverters", "EVChargingCableHolders", "EVChargingCables", "EVChargingStations", "EVConnectors", "ElectricMotors", "OnBoardChargers"],
  RVPartsAndAccessories:["RVAttachedTents", "RVAwningScreensAndAccessories", "RVCookingAppliances", "RVCovers", "RVDrainSystems", "RVExternalShowerSystems", "RVFittingsAndAssemblyParts", "RVToilets"],
  TrainAndRailwayPartsAndAccessories:["RailwayPartsAndAccessories", "TrainPartsAndAccessories"],
  TruckPartsAndAccessories:["TruckBearings", "TruckBodyParts", "TruckBrakeDiscs", "TruckBrakePads", "TruckBrakeShoes", "TruckBrakeSystems", "TruckEngineParts", "TruckExhaustSystems", "TruckFasteners", "TruckLights", "TruckRepairKits", "TruckSealingKits", "TruckSteeringParts", "TruckTransmissions"],

  RepairEquipment: ["BodyRepairTools", "CreepersAndRollerSeats", "DiagnosticTools", "ParkingEquipment", "TireChangers", "TireInflators", "TireRepairTools", "VehicleLifts", "WheelAlignmentMachines"],
 
  FluidFlushes: ["AutomaticTransmissionFluids", "BrakeFluids", "CarburetorAndThrottleBodyCleaners", "EngineCleaners", "EngineCoolants", "FluidAdditives", "FuelInjectionFluids", "FuelSystemCleaners", "PowerSteeringFluids", "RadiatorFluids", "WindshieldWiperFluids"],
  GreasesAndLubricants: ["GreaseAdditives", "Greases", "LubricantAdditives", "Lubricants"],
  Oils:["AirConditioningOils", "EngineOils", "GearOils", "HydraulicOils", "OilAdditives"],
  
  EmergencyTools: ["CarEmergencyEquipment", "JerryCans", "JumpStarters"],
  TowingAndWinches: ["HitchHooks", "HitchMounts", "TowBalls", "TowBars", "TowHooks", "TowRopes"],
  
  CommercialWheelsAndTires: ["RVTires", "RVWheels", "TrailerTires", "TrailerWheels", "TruckTires", "TruckWheels"],
  MotorcycleScooterWheelsAndTires: ["MotorcycleTires", "MotorcycleWheels", "ScooterTires", "ScooterWheels"],
  PassengerCarAndOffRoadWheelsAndTires:["ATVAndUTVTires", "ATVAndUTVWheels", "CarTires", "CarWheels", "PickupAndSUVTires", "PickupAndSUVWheels", "RacingCarTires", "RacingCarWheels"],
  WheelPartsAndAccessories:["LugNutsAndAccessories", "SnowChains", "ValveStemsCapsAndAdapters", "WheelCaps", "WheelDustShields", "WheelHubsAdaptersAndSpacers", "WheelParts", "WheelWeights"],

  BreadAndWraps: ["BunsAndRolls", "Flatbread","LoafBread","SlicedBread","Specialtybread","TortillaAndWraps"],
  Pastry: ["CakesAndMuffins", "KaakAndBreadsticks","PastriesAndManakish","PuffsAndCroissants","TartsAndPies"],

  Coffee: ["ArabicCoffee", "CapsulesAndPods","CoffeeAlternatives","CoffeeBeans","CoffeeCreamers","DecafCoffee","GroundCoffee","InstantCoffee","SpecialtyCoffee","TurkishCoffee"], 
  FitnessDrinks: ["ProteinDrinks", "ShotsAndBoosters"], 

  Chocolate: ["ChocolateBars", "ChocolateCandies","ChocolateChips","ChocolateCream"], 
  CookiesAndBiscuits: ["Biscuits", "Cookies","Wafers"],

  Butter: ["ButterBlocks", "ButterRolls","PlantBasedButter","SprayButter","TruffleButter"], 
  Cheese: ["BlueCheese", "Cheddar","Cottage","CreamCheese","Emmental","Feta","GoudaAndEdam","HalloumiAndAkkawi","Kashkaval","Mozzarella","SlicedCheese","SpecialtyCheese"], 

  FrozenFishAndSeafood: ["FrozenFish", "FrozenSeafood"], 
  FrozenFruitsAndVegetables: ["FrozenFruits", "FrozenVegetables"],

  FreshFruits: ["ApplesAndPears", "ApricotsAndPlums","Berries","Cherries","CitrusFruits","Melons","PeachesAndNectarines","TropicalFruits"], 
  FreshVegetables: ["BeansAndPeas", "EdiblePlantStem","Flowers","HerbsAndleaves","Marrow","Mushrooms","OnionsAndGarlic","Roots","SaladVegetables","Vegetales Others"],

  FishAndSeafood: ["Fish", "Seafood"], 
  Meat: ["Beef", "Camel",'Goat',"Lamb"], 

  BakingDecorations: ["BakingCoatings", "BakingFillings","BakingToppings"], 
  BakingIngredients: ["BakingMix", "BakingPowderAndSoda","BreadCrumbs","CakeMix","Flour","FoodAdditives","FoodColors","Gelatin","Powders","Semolina","Vanilla","WhippingCreamPowder","Yeast"], 

  BabyBath: ["BabyBathAccessories", "BabyBathSeatsAndStands", "BabyBathTowelsAndRobes", "BabyBathtubs", "BabyBodyWash", "BabyConditioner", "BabyNonSlipBathmats", "BabyShampoo", "BabySpongesAndWashCloths", "BabyWashBowls"], 
  BabyHealthCareAndGrooming: ["BabyCombsAndBrushes", "BabyCottonPadsAndBuds", "BabyNailCare", "BabyNasalAspirators", "BabyNebulizers", "BabyOralCare", "BabyScales", "BabyThermometers", "BabyWetWipes"],
  BabySafety:["BabyCrawlingPads", "BabyLeashesAndHarnesses", "BabyMonitorsAndCameras", "BabySafetyGates", "BedRails"],
  BabySkinCare:["BabyCreamAndLotion", "BabyOil", "BabyPerfume", "BabyPowder", "BabySunscreen"],
  
  BabyClothing: ["BabyCapsBeaniesAndScarfs", "BabyClothingSets", "BabyCoatsAndJackets", "BabyCostumes", "BabyDresses", "BabyDungarees", "BabyHoodiesAndSweatshirts", "BabyJeans", "BabyLeggingsAndPants", "BabyMittens", "BabyRompersAndJumpsuits", "BabyShorts", "BabySkirts", "BabySleepsuitsAndPajamas", "BabySwimwear", "BabyTshirtsAndShirts", "BabyTights", "BabyVests", "BodysuitsAndInnerwear", "NewbornClothingSets"], 
  BabyClothingAccessories: ["BabyBellyWarmers", "BabyHairAccessories", "BabySafetyPins"],
  BabyFootwear:["BabyShoes", "BabySocksAndBooties"],

  BabyDiapers: ["DisposableBabyDiapers", "ReusableBabyDiapers"], 
  ChangingPads: ["ChangingPadsAndMats", "WaterproofSheets"],
  DiaperingAccessories:["DiaperPailsAndRefills", "DisposableDiaperBags"],
  PottyTraining:["Potties", "ToddlerToiletSeats"],

  BabyFeeding: ["BabyCups", "BabyFeeders", "BabyFeedingSets", "BabyFoodStorage", "BabyPlaceMats", "BabyPlatesAndBowls", "BabySpoonsAndForks"], 
  BabyFood: ["BabyCerealsAndMeals", "BabyFormula", "BabyJuice", "BabySnacks"],
  BibsAndBurpCloths:["BabyBibs", "BabyBurpCloths"],
  BottleFeeding:["BabyBottlesAndNipples", "BottleCleaningProducts", "BottleDryersAndSterilizers", "BottleWarmers", "MilkPowderDispensers", "WaterThermos"],
  Breastfeeding:["BreastCreams", "BreastPumps", "BreastShieldsAndShells", "MilkStorageBags", "NursingCovers", "NursingPads", "NursingPillows"],
  PacifiersAndTeethers:["BabyPacifiers", "BabyTeethers", "PacifierHolders"],

  Activity: ["BabyBouncersAndSwings", "BabyGymsAndPlaymats", "BabyPlaypens", "BabyWalkersAndJumpers"], 
  ChairsAndSeats: ["HighchairsAndFeedingBoosters", "ToddlerChairsAndSofas"],
  StrollersAndCarSeats:["CarSeatBases", "CarSeatPartsAndAccessories", "CarSeatsAndBoosters", "StrollerPartsAndAccessories", "StrollersAndPrams", "TravelSystems"],
  Travel:["BabyCarriersAndWraps", "BabyCarryCots", "BabyDiaperBags", "BabyTravelCots"],

  BabyBeddings: ["BabyBlanketsAndSwaddles", "BabyComforterSets", "BabyPillowCases", "BabyPillows", "BedBumpers", "BedSheetsAndMattressProtectors", "SleepingBagsAndNests"], 
  BabyFurniture: ["BabyDrawersAndShelves", "BabyMattresses", "BabyRoomCarpets", "BabyWardrobes", "ChangingTables", "CribsAndBeds"],

  MakeupToolsAndAccessories: ["BlottingPaper", "EyebrowRazors", "EyebrowTweezers", "EyelashCurlers", "FoundationPlates", "MakeupBags", "MakeupBrushes","MakeupMirrors","MakeupPencilSharpeners","MekeupStencils","MakeupToolKits"], 
  NailCareTools: ["CallusRemover", "ElectricNailDrills","ElectircNailDryers","FootFiles","NailCleaningBrushes","NailClippers","nailFilesAndBuffers","ToeSeparator"], 

  Perfumes: ["BodySpraysAndMists", "EauDeCologne", "EauDeParfum", "EauDeToilette","FragranceGiftSets", "HairPerfumesAndMists", "Oud", "PerfumeOils"],

  BodyArt: ["TattooStencils", "TattooTools"], 
  BodyMakeup: ["BodyBronzers", "BodyConcealers", "BodyGlitters"], 
  EyeMakeup:["EyePencil", "EyeShadow", "Eyeliner", "FalseLashesAndAdhesives", "LashEnhancersAndPrimers", "Mascara"],
  EyebrowMakeup:["EyebrowGel", "EyebrowMascara", "EyebrowPencil", "EyebrowPowder"],
  FaceMakeup:["BBAndCCCream", "Blush", "Bronzer", "ConcealerAndCorrector", "Contour", "Foundation", "Highlighter", "MakeupSets", "Powder", "Primer", "SettingSpray"],
  Lips:["LipGloss", "LipLiner", "Lipstick"],

  NailArt: ["FalseNailsAdhesives", "NailArtTemplates", "NailArtTools", "NailDecoration", "NailStickers"], 
  NailCareProducts: ["CuticleRemover", "NailPolish", "NailPolishRemover", "NailTreatments", "TopAndBaseCoat"],

  EyeCare: ["EyeCreamsAndGel", "EyeMakeupRemovers", "EyeMasks", "EyeSerums"], 
  FaceCare: ["FaceCareSets", "FaceCreamsAndMoisturizers", "FaceGel", "FaceOils", "FaceScrubs", "FaceSerums", "FaceToners", "FacialMasks", "MakeupRemoversAndCleansers"],
  LipCare:["LipBalms", "LipScrubs"],
  SunCareAndTanning:["AfterSunCare", "Self-Tanners", "Sunscreen"],

  CleaningAppliances: ["ElectricDeepCleaners", "ElectricFloorCleaners","ElectricFloorCleaners","ElectricWindowCleaners","SteamMops","VacuumCleaners"], 
  CoffeeAndEspressoMachines: ["CoffeeBeanGrinders", "CoffeeMachines","EspressoMachines"],

  BarFurniture: ["BarChairsAndStools", "BarTables"], 
  HairSalonFurniture: ["HairdressingChairs", "NailCareChairs","NailCareTables","SalonMassageBeds","SalonStationMirrors","SalonTrolleys","ShampooChairs"], 

  BBQAndGrills: ["BBQAccessories", "BBQCleaningTools","BbqFans","BbqGrillsAndSmokers","BbqMittens","BbqToolsAndSets","BarbecueKettles","Charcoal","CharcoalStarters","FireWood","GrillBrushes","GrillCovers"], 
  GardenDecor: ["ArchesAndArbors", "CobblesAndPebbles","DecorativeStonesAndStatues","FencesNettingsAndGates","Fountains","PergolasAndTrellises","ShedsAndStorage"],

  ArtworkAndFrames: ["ArtCards", "Mosaics","PhotoFrames","WallArtAndFrames","WallHangings","WallStickers","Wallpaper"], 
  Clocks: ["FloorClocks", "SpecialtyClocks","TableClocks","WallClocks"], 
   
  Bedrooms: ["BedBases", "BedroomSets","Beds","BedsideTables","DrawerUnits","Dressers","Headboards","Mattresses","SpringBoxes","Wardrobes"], 
  DiningRooms: ["DiningChairs", "DiningTableSets","DiningTables","SideboardsAndBuffets",], 

  Bedding: ["BedSheets", "BedSkirts","BedTents","BeddingAccessories","BeddingSets","BlanketsAndThrows","DuvetCovers","Duvets","MattressProtectors","PillowsAndCushionCover","SeatRestsAndChair","Slipcovers"],
  CarpetsAndRugs: ["Carpets", "Doormats","Mats","PrayerMats","Rugs","Tapestry"],

  BathroomAccessories: ["BathMats", "BathTowels","Bathrobes","BathroomMats","BathtubPillows","BeachTowels","HairTowels","HandTowels","ShowerCurtains","ShapTraysAndDispenser","ToothbrushHolders","ToothpasteSqueezers"], 
  CleaningSupplies: ["AirFresheners", "BathroomCleaners","DishCleaners","DrainCleaners","FloorCleaners","FurnitureCleaners","GlassCleaners","KitchenCleaners","LaundryCleaners","MultiPurposeCleaners"],

  Bakeware: ["BakewareSets", "BakingAndPastryTools","BakingMats","BakingPans","CakeTools","CookieTools","OvenMittens","PizzaTools","RollingPins"], 
  CoffeeAndTeaTools: ["CoffeeFilters", "CoffeePots","MilkFrothers","MilkFrothingPitchers","Teapots"],

  Printers3D: ["Printers3D"],

  AgriculturalMachineryParts: ["AgriculturalMachineryParts"],
  AgriculturalSprayer: ["AgriculturalSprayer"],

  ApparelAndTextileMachineryParts: ["ApparelMachineParts", "CapMakingMachineParts","GloveMakingMachine","HometextileProduct","LeatherProductionMachineParts","ShoemakingMachineParts","SockKnittingMachine","TextileMachineParts"], 
  ApparelMachinery: ["ButtonMakingMachines", "ButtonholeMachines","EmbroideryMachines","IndustrialGarmentPressMachine","IndustrialGarmentSteamers","LaceMachines","OtherApparelMachine","Overlockers","RhinestoneMachines","SewingMachines","ZipperMakingMachines"],

  ChemicalMachineryAndEquipment: ["3DBlu-rayPlayer", "ChemicalMachineParts","ChemicalStorageEquipment","ChemicalTransportation","DryingEquipment","Granulators","GrindingEquipment","HeatTransferEquipment","MixingEquipment","OtherChemicalMachines","PressureVesseles","Reactors","SeparationEquipment"], 
  CosmeticsProductionEquipment: ["CosmeticsProductionEquipment"],

  AirCleaningEquipment: ["AirCleaningEquipmentParts", "AirShower","Dehumidifier","Humidifier","OtherAirCleaningEquipment"],
  CleaningEquipmentParts: ["CleaningEquipmentParts"],

  AbrasiveMachines: ["AbrasiveMachines"], 
  BuildingMaterialMachinery: ["BoardMakingMachinery", "BrickMakingMachinery","BuildingMaterialMaking","CementMakingMachine","DryMortarMachines","DuctMakingMachines","Floorboards","GlassProductionMachines","GypsumPowderMachines","PipeMakingMachines","PlasterOfParisMachines","SandMakingMachinery","StoneMachinery"],

  BakingEquipment: ["BakingOven", "BreadMakingMachine","CakeMachine","DoughMixer","DoughSheeter","OtherBakingEquipment"], 
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
  ChildrensBooks: ["ActivityBooksAndGames", "AnimalsAndPets","CraftsAndHobbies","EarlyLearning","FictionAndStories","ScienceAndNature","StudyingAndWorkbooks"],

  BinsAndBaskets: ["BinsAndBaskets"], 
  BusinessCardsAndOrganizers: ["BusinessCardsAndOrganizers"],

  DividersAndBookmarks: ["DividersAndBookmarks"], 
  DocumentBagsAndDisplayBooks: ["DocumentBagsAndDisplayBooks"],

  Batteries: ["Batteries"], 
  BinderClipsAndPins: ["BinderClipsAndPins"],

  CabinetsAndDrawerUnits: ["Bookcases", "Cabinets","DrawerUnits","Shelves"], 
  ChairsAndSeating: ["ChairMatsAndAccessories", "DeskChairs","FootStoolAndFootrest","OfficeSofasAndBenches","SeatingAccessories","VisitorChairs",],

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

  HairAccessories: ["HairClips", "HairPins","HairTies","HeadBands","Tiaras","WigsAndHairExtensions"],
  HairCare: ["BeardCare", "Conditioner","HairCareSets","HairLossProducts","HairMasks","HairOilsAndSerums","HairTreatments","KeratinTreatments","Shampoo"],

  BathAndBody: ["BathAccessories", "BodyCreamsLotionsAndMoisturizers","BodySoapAndWash","BrushesSpongesAndGloves","Condoms","CottonBallsPadsAndSwabs","DeodorantsAndAntiper","EarPlugs","FeminineCare","FootPowder","FootSpa","HandSoapAndWash","IncontinenceProduction","Sanitizers","ShowerCaps","TalcumPowder"],
  HairSalonDisposables: ["DisposableAccessories", "DisposableBedRolls","DisposableSlippers","DisposableTowels","DisposableUndergraments","SterilizationPouches"], 

  HairStylingTools: ["CurlingIrons", "ElectricHairBrushes","HairBraiders","HairBrushes","HairCombs","HairDryers","HairRollers","HairScissors","HairStemersAndHoods","HairStraighteners","HairdressingGowns","MultiStylers"], 
  ShavingAndHairRemovalTools: ["ElectricHairRemovalDevices","ElectricShaversAndTrimmers","LaserHairRemovalDevices","ManualHairRemovalDevices","RazorsAndBlades","ShavingBrushes","TemporaryCategory","WaxApplicators","WaxHeaters"],

  AnimalFeedsAndSupplements: ["AnimalFeedsAndSupplements"],

  CleaningSupplies: ["CleaningSupplies"], 
  CollarsAndLeashes: ["CollarsAndLeashes"],

  Chews: ["Chews"],
  DryFoods: ["DryFoods"], 

  Aquariums: ["Aquariums"],  
  Beds: ["Beds"],
  
  ExerciseMachines: ["EllipticalTrainers", "ExerciseBikes","MultiFunctionStations","PilatesReformersAndParts","PinLoadSelectionMachines","PlateLoadedMachines","Rowers","SpinningBike","Treadmills","VibrationPlatformMachines"],  
  FitnessAccessories: ["BalanceBoard", "Blocks","BoxingGloves","Chalk","ExerciseBalls","FitnessMats","HandGrips","JumpRopes","ProtectiveGear","PushUpsAndDipStands","SaunaSuitsAndWaistTrimmers","SportHoops","StepPlatforms","SupportSleevesAndBraces","WaterAndShakerBottles"],

  BallGames: ["AmericanFootball", "BaseballAndSoftball","Basketball","Cricket","Football","Golf","Hockey","Netball","Rugby","Volleyball"],  
  BikePartsAndTools: ["BikeAirPumps", "BikeBasketsAndBags","BikeBellsAndMirrors","BikeGpsAndElectronics","BikeLocks","BikeLubeAndGrease","BikeParts","BikeSeatsAndCovers","BikeTiresTubesAndWheels"],   

  WaterSportShoes: ["WaterSportShoes"],

  WaterSportsAndActivities: ["WaterSportsAndActivities"],

  AdventCalendars: ["AdventCalendars"],  
  CraftSets: ["BeadAccessoriesSets", "CandlesMakingSets","KnittingSets","ManicureSets","SewingSets","SoapMakingSets"],  

  BabyGymsAndPlaymats: ["MusicAndLightPlaymats", "PianoPlaymats","PlayGyms","Playments"],  
  BabyToys: ["Rattles", "SoftToys","SpiralActivityBars","StrollerHangingToys"],

  RemoteControlToys: ["RemoteControlAirplanesHelicopters", "RemoteControlAnimals","RemoteControlVehicals","VehiclePlaysets"],

  BuildingBlocks: ["FoamBlocks", "LegoAndBricks","MagneticBlocks","WoodenBlocks"],  
  BuildingToys: ["ModelBuildingToys"],

  DollhousesAndAccessories: ["DollAccessories", "DollStrollers","Dollhouses"],  
  Dolls: ["BabyDolls", "FashionDolls"],

  LanguageAndLiteracy: ["AlphabetFlashcards", "KidsLaptops","KidsTablets","LearningBooks","MagneticLetters","Stories","TimeTeachingClock"],  
  MathAndCountToys: ["MagneticNumbers", "MathLearningBooks","NumbersFlashcards","WoodenAbacus"],

  SoundAndLightToys: ["DancingToys", "MusicalInstruments","MusicalPhones","SteeringWheels",""],

  FidgetToys: ["FidgetToys"],
  SquishyToys: ["SquishyToys"],

  BeachToys: ["BeachBalls", "Kites","SandToolsSets"], 
  BikesScootersAndRideOns: ["Bicycles", "Helmets","RideOnCars","Scooters","SkateBoards","Swayers","Tricycles"],

  AnimalAndActionFigures: ["ActionFigures", "AnimalFigures"], 
  VehicleToys: ["Bikes", "Buses","Cars","Planes","ShipsAndBoats","Submarines","Trains","Trucks"],

  DressingUpAndCostumes: ["Accessories", "Costumes","Masks","Wigs"],
  PretendPlay: ["BeautyPlaysets", "DoctorPlaysets","HairstylingPlaysets","HouseholdPlaysets","KitchenPlaysets","ShoppingCartsPlaysets"],

  Games: ["BoardGames", "CardGames","DartGames"],
  Puzzles: ["Puzzles3D", "BrainTeasers","JigsawPuzzles","PeggedPuzzles","WoodenPuzzles"],

  BathroomAndKitchenAccessories: ["BathroomRacksAndHolders", "DrainStrainersPlugsAndCovers","Drains","KitchenRacksAndHolders","ShowerFootrests","ShwerGrabBars"],
  SinksVanitiesAndCabinets: ["BathroomCabinets", "BathroomMirrors","BathroomsSinks","BathroomVanities","CabinetPartsAndAccessories","KitchenCabinets","kitchenSinks"],

  BuildingBoards: ["AluminumBoards", "Cementboards","Drywalls"], 
  BuildingGlassAndAccessories: ["ClearGlass", "CurtainWallAccessories","CurtainWalls","DecorativeAndPatternedGlass","ElectrochromicGlass","InsulatedGlass","LaminatedGlass","ReflectiveGlass","TemperedGlass","TintedGlass"],

  DoorAndWindowHardware: ["DoorAndWindowRollerWheels", "DoorFrames","DoorFrames","DoorKickPlates","DoorKnockers","DoorViewers","DoorPlates","DoorBells","DoorstopsAndClosers","HandlesKnobsAndLever","ScreenAndSplineAccessories","ScreensAndSplines","WeatherStripping"], 
  Doors: ["AutomaticDoors", "FoldingDoors","GarageDoors","Gates","RevolvingDoors","SlabDoors","SlidingDoors","SwingDoors"],

  CablesWiresAndAccessories: ["CableClipsTiesAndWraps", "CableConduitsAndTrunks","CableConduits&Trunks","CableLadders","ElectricalWirs","WiringHarness"], 
  FusesAndCircuitBreakers: ["ElectricalCircuitBreakers", "ElectricalCircuitBreakers"],

  AdhesivesAndFillers: ["CaulkAndSealant", "Glue","Resin","SiliconeTubes"], 
  PaintAndCoating: ["AutomotivePaintAndCoating", "DecorativePaintAndCoating","FlooringPaintAndCoating","IndustrialPaintAndCoating","MarinePaintAndCoating","PrimersAndBaseCoats","ProtectivePaintsAndCoating","TopCoats","WoodPaintsAndCoating"], 

  IndoorLighting: ["BathroomLighting", "CeilingLights","DecorativeLights","FloorLamps","LightBulbs","PictureLights","SpotLightsAndDownlights","TableLamps","TrackLighting","WallLights"],
  OutdoorLighting: ["CampingLights", "DeckLights","EmergencyAndWarningLights","FloodLights","LampPosts","SolarLights","SpikeLights","UnderWaterLights"],

  Alarms: ["AlarmSystems", "GlassBreakDetectors","HeatAndSmokeDetector","MotionDetectors"], 
  ChildSafety: ["AntiSlipsANdUnderlays", "CabinetLocksAndStraps","DoorAndWindowGuards","EdgeAndCormerBumper","PlugSocketCovers","StoveGaurds","ToiletLocks"],

  DimensionalAndLevelMeasurement: ["Calipers", "Micrometers","LevelMeasurmentTools","Micrometers","ThicknessGauges"],
  ElectricalMeasurement: ["CurrentAndVoltageMeters", "EMFMeters","EnergyMeters","FrequencyCounterAndMeters","FunctionGenerator","PulseGenerators","ResistanceAndCapacitanceMeters","SpectrumAnalyzerAndOscilloscopes"],

  Fasteners: ["Bolts", "Nuts","Flanges","GasketsAndSeals","Hinges","Nails","Nuts","Pins","RetainingRings","Rivets","ScrewEyesAndHooks","ScrewsAnchorsAndPlugs","Shackles","Staples","StudsAndThreadesRods","ThreadsInserts","Washers"], 
  FurnitureHardware: ["CasterAndRollerWheels", "Dampers","EdgeBanding","FurnitureLegs","FurniturePads","SlidingRails"],

};

export { supOptions, subOptions, miniSubOptions, microSubOptions }