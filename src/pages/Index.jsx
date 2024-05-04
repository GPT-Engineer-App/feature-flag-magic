import { Container, VStack, Switch, FormControl, FormLabel, Heading, Box } from "@chakra-ui/react";
import { useState } from "react";

const featureList = [
  { id: 1, name: "Feature 1", description: "Description of Feature 1" },
  { id: 2, name: "Feature 2", description: "Description of Feature 2" },
  { id: 3, name: "Feature 3", description: "Description of Feature 3" },
  { id: 4, name: "Feature 4", description: "Description of Feature 4" },
  { id: 5, name: "Feature 5", description: "Description of Feature 5" },
];

const Index = () => {
  const [features, setFeatures] = useState(featureList.reduce((acc, feature) => ({ ...acc, [feature.id]: false }), {}));

  const toggleFeature = (id) => {
    setFeatures(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Feature Flags Dashboard</Heading>
      <VStack spacing={5}>
        {featureList.map(feature => (
          <Box key={feature.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" w="100%">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel htmlFor={`feature-switch-${feature.id}`} mb="0">
                {feature.name}: {feature.description}
              </FormLabel>
              <Switch id={`feature-switch-${feature.id}`} isChecked={features[feature.id]} onChange={() => toggleFeature(feature.id)} />
            </FormControl>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;