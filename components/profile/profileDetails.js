import { Text, HStack, Button, Box } from "@chakra-ui/react";
import { FaDiscord, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";

export default function ProfileDetails({ profile }) {
  if (profile)
    return (
      <Box p="5" fontSize="sm" maxW="sm">
        <Text>{profile.description}</Text>
        <HStack m="5">
          {profile?.discord && (
            <Button
              as="a"
              href={"https://discord.com/invite/discord.gg/" + profile.discord}
              target="_blank"
            >
              <FaDiscord />
            </Button>
          )}
          {profile?.github && (
            <Button
              as="a"
              href={"https://github.com/" + profile.github}
              target="_blank"
            >
              <FaGithub />
            </Button>
          )}
          {profile?.twitter && (
            <Button
              as="a"
              href={"https://twitter.com/" + profile.twitter}
              target="_blank"
            >
              <FaTwitter />
            </Button>
          )}
          {profile?.website && (
            <Button as="a" href={profile.website} target="_blank">
              <FaGlobe />
            </Button>
          )}
        </HStack>
      </Box>
    );
}
