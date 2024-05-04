import { Container, VStack, Switch, FormControl, FormLabel, Heading, Box, Button, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [featureList, setFeatureList] = useState([
    { id: 1, name: "Feature 1", description: "Description of Feature 1" },
    { id: 2, name: "Feature 2", description: "Description of Feature 2" },
    { id: 3, name: "Feature 3", description: "Description of Feature 3" },
    { id: 4, name: "Feature 4", description: "Description of Feature 4" },
    { id: 5, name: "Feature 5", description: "Description of Feature 5" },
  ]);
  const [features, setFeatures] = useState(featureList.reduce((acc, feature) => ({ ...acc, [feature.id]: false }), {}));
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');
  const toast = useToast();

  const toggleFeature = (id) => {
    setFeatures(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addFeature = () => {
    if (!newFeatureName || !newFeatureDescription) {
      toast({
        title: 'Error',
        description: 'Name and description are required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newId = featureList.length + 1;
    const newFeature = { id: newId, name: newFeatureName, description: newFeatureDescription };
    setFeatures({ ...features, [newId]: false });
    setFeatureList([...featureList, newFeature]);
    setNewFeatureName('');
    setNewFeatureDescription('');
    toast({
      title: 'Feature Added',
      description: 'New feature has been added successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const removeFeature = (id) => {
    const updatedFeatures = { ...features };
    delete updatedFeatures[id];
    setFeatures(updatedFeatures);
    setFeatureList(featureList.filter(feature => feature.id !== id));
    toast({
      title: 'Feature Removed',
      description: 'Feature has been removed successfully',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Feature Flags Dashboard</Heading>
      <VStack spacing={5} align="stretch">
        <Box d="flex" mb={5}>
          <Input placeholder="Feature Name" value={newFeatureName} onChange={(e) => setNewFeatureName(e.target.value)} mr={2} />
          <Input placeholder="Feature Description" value={newFeatureDescription} onChange={(e) => setNewFeatureDescription(e.target.value)} mr={2} />
          <Button colorScheme="blue" onClick={addFeature}>Add Feature</Button>
        </Box>
        {featureList.map(feature => (
          <Box key={feature.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" w="100%" d="flex" alignItems="center" justifyContent="space-between">
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor={`feature-switch-${feature.id}`} mb="0">
                {feature.name}: {feature.description}
              </FormLabel>
              <Switch id={`feature-switch-${feature.id}`} isChecked={features[feature.id]} onChange={() => toggleFeature(feature.id)} />
            </FormControl>
            <Button colorScheme="red" onClick={() => removeFeature(feature.id)}>Remove</Button>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;