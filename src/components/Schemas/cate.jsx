

const supOptions = ["Groceries", "ConsumerElectronics", "FashionAndAccessories", "AutoParts", "FoodAndBeverages", "BabyCenter", "BeautyAndFragrances", "HomeGardenAndFurniture", "MachineryAndEquipment", "OfficeAndStationery", "PersonalCare", "PetAndAnimalCare", "SportsAndFitness", "Toys", "ToolsAndHomeImprovement", "Electrical"];


const subOptions = {
  Groceries: ["red", "green"],
  ConsumerElectronics: ["AudioAndStudio", "CamerasAndCamcorders", "ComputersAndAccessories", "ElectricalAndElectronicAccessories", "GamingAndConsoles", "MobilePhonesAndTablets", "MusicalInstruments", "ProjectorsAndAccessories", "SmartHomeSolutions", "TelephonesAndCommunication", "TelevisionsAndStreamingDevices", "Wearables"],
  FashionAndAccessories: ["Bags", "Clothing", "Eyewear", "Footwear", "WatchesAndJewelry"],
  AutoParts: [],
  FoodAndBeverages: ["BakeryAndPastry", "Beverages", "Confectionery", "DairyAndEggs", "FrozenFood", "FruitAndVegetables", "MeatPoultryAndFish", "Pantry"],
  BabyCenter: ["BabyCare", "BabyClothingAndFootwear", "BabyDiapering", "BabyFeedingAndNursing", "BabyGear", "BabyNursery"],
  BeautyAndFragrances: ["BeautyTools", "Fragrances", "Makeup", "Nails", "Skincare"],
  HomeGardenAndFurniture: ["Appliances", "CommercialFurniture", "GardenAndOutdoor", "HomeDecor", "HomeFurniture", "HomeTextiles", "HouseholdSupplies", "KitchenAndDining"],
  MachineryAndEquipment: ["3DPrinters", "AgriculturalMachineryEquipment", "ApparelAndTextileMachinery", "ChemicalAndPharmaceuticalMachinery", "CleaningAndFiltrationMachinery", "EngineeringAndConstructionMachinery", "FoodAndBeverageMachinery", "PackagingMachine", "PlasticAndRubberProcessingMachinery"],
  OfficeAndStationery: ["ArtAndCrafts", "BoardsAndEasels", "Books", "DeskSupplies", "FilesAndFolders", "GeneralSupplies", "OfficeFurniture", "OfficeMachinesAndEquipments", "PackagingMaterial", "PrintersScannersAndLabelMachines", "PrintingPaper", "TapesAndAdhesives"],
  PersonalCare: [],
  PetAndAnimalCare: [],
  SportsAndFitness: [],
  Toys: [],
  ToolsAndHomeImprovement: [],
  Electrical: [],
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

  yellow: ["sweetyellow", "souryellow"],
  black: ["sweetblack", "sourblack"]
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

  sweetyellow: ["seventeen", "eighteen"],
  souryellow: ["nineteen", "twenty"],
  sweetblack: ["twentyone", "twentytwo"],
  sourblack: ["twentythree", "twentyfour"]
};


export { supOptions, subOptions, miniSubOptions, microSubOptions }