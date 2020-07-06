import React, { useRef } from "react"
import SolutionLineArrow from "./solution-line-arrow.svg"
import Collapser from "components/atoms/Collapser"
import Video from "components/molecules/Video"
import Tooltip from "components/organisms/Tooltip"

import {
  Button,
  Flex,
  Box,
  Container,
  Link,
  Heading,
  Image,
  Text,
} from "@theme-ui/components"
import { alpha } from "@theme-ui/color"
import { JSONTabs } from "components/organisms/Tabs"

import Switchable from "components/organisms/SwitchableMode/Switchable"
import Switch from "components/organisms/SwitchableMode/Switch"
import GitHubIcon from "media/icons/github.svg"
import GitLabIcon from "media/icons/gitlab.svg"

export const groupApply = (rawChildren, test, cb) => {
  if (!rawChildren) return []
  const currentGroup = []
  const result = []

  const children = Array.isArray(rawChildren) ? rawChildren : [rawChildren]

  for (const child of children) {
    if (test(child) === true) {
      currentGroup.push(child)
    } else {
      if (currentGroup.length > 0) {
        /*
           If the current child doesn't pass the test and there is currently a
           group of passing items, add the result of the callback applied on
           a copy of that group, then clear the group.
         */
        result.push(cb(currentGroup.slice(), result.length))
        currentGroup.length = 0
      }
      // Add the non-passing child directly to the result, ungrouped.
      result.push(child)
    }
  }

  // Process the last group if the last child passed.
  if (currentGroup.length > 0) {
    result.push(cb(currentGroup, result.length))
  }

  return result
}

const ContainExcept = ({
  container: ContainerComponent = Container,
  fullWidthComponents = ["FullWidthBox"],
  children,
}) => {
  const processedChildren = groupApply(
    children,
    child => !fullWidthComponents.includes(child.props.mdxType),
    (group, i) => (
      <ContainerComponent key={`wrapped-container-${i}`}>
        {group}
      </ContainerComponent>
    )
  )
  return <>{processedChildren}</>
}

const FullWidthBox = ({
  children,
  className,
  sx: { Inner, ...sx },
  ...props
}) => {
  return (
    <Box variant="styles.FullWidthBox" className={className} sx={sx} {...props}>
      <Container sx={Inner}>{children}</Container>
    </Box>
  )
}

const HomeFeature = ({ children, heading, icon: Icon }) => {
  return (
    <Box
      sx={{
        borderTopStyle: ["solid", null, null, "none"],
        borderLeftStyle: ["none", null, null, "solid"],
        borderWidth: "1px",
        borderColor: "rgba(255,255,255,0.3)",
        mx: "auto",
        px: [1, null, "35px"],
        py: "1px",
        maxWidth: "600px",
        svg: {
          mb: ["20px", null, null, "30px"],
        },
        "&:first-of-type": {
          borderTop: "none",
          borderLeft: "none",
          pl: "30px",
        },
        "&:last-of-type": {
          pr: "30px",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          my: ["40px", "25px"],
          mx: "auto",
        }}
      >
        <Icon />
        <Heading as="h3" sx={{ my: 3 }}>
          {heading}
        </Heading>
        <Box>{children}</Box>
      </Box>
    </Box>
  )
}

const RepoButton = ({ url, host = new URL(url).host }) => {
  switch (host) {
    case "github.com":
      return (
        <Link href={url} variant="RepoButton">
          <GitHubIcon width="18" height="18" />
          <span>GitHub</span>
        </Link>
      )
    case "gitlab.com":
      return (
        <Link href={url} variant="RepoButton">
          <GitLabIcon width="18" height="18" />
          <span>GitLab</span>
        </Link>
      )
    default:
      return null
  }
}

const Code = ({ children, lang, filename, repo, sx = {} }) => {
  const renderHeader = lang || filename
  const codeBlockRef = useRef()
  return (
    <Box
      sx={{
        backgroundColor: "darkPurple.0",
        display: "flex",
        flexFlow: "column nowrap",
        ...sx,
      }}
    >
      {renderHeader && (
        <Flex
          sx={{
            px: "20px",
            alignItems: "center",
            flexFlow: "row wrap",
            minHeight: "50px",
            letterSpacing: "0.03em",
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            color: "rgba(255, 255, 255, 0.5)",
            justifyContent: ["center", null, "space-between"],
          }}
        >
          <Heading
            as="h3"
            sx={{
              flex: "0 1 auto",
              fontSize: "14px",
              my: 2,
              mx: "auto",
              display: "block",
            }}
          >
            {filename || lang}
          </Heading>
          <Box sx={{ flex: "1 1" }} />
          <Flex sx={{ flex: "0 0 auto", justifyContent: "center" }}>
            {repo && <RepoButton url={repo} />}
            <Button
              variant="copy"
              onClick={e => {
                e.preventDefault()
                const pre = codeBlockRef.current
                if (!pre || !navigator.clipboard) return
                navigator.clipboard.writeText(pre.innerText)
              }}
            >
              Copy
            </Button>
          </Flex>
        </Flex>
      )}
      <Box as="code" variant="styles.CodeBlock">
        <Box as="pre" ref={codeBlockRef}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

const SolutionList = ({ children, sx, className }) => (
  <Box as="ul" variant="styles.SolutionList" className={className} sx={sx}>
    {children.map(([problem, solution], i) => (
      <SolutionLine problem={problem} solution={solution} key={i} />
    ))}
  </Box>
)

const SolutionLine = ({ problem, solution }) => (
  <Box as="li" variant="styles.SolutionList.Item">
    <h3>{problem}</h3>
    <SolutionLineArrow />
    <h3>{solution}</h3>
  </Box>
)

const ExampleBox = ({ title, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "background",
        boxShadow: "default",
        textAlign: "left",
        color: "text",
        maxWidth: [null, null, "50%"],
      }}
    >
      <Box
        sx={{
          backgroundColor: [alpha("darkPurple.0", 0.1), null, "darkPurple.0"],
          color: ["text", null, alpha("background", 0.5)],
          alignItems: "left",
          flexFlow: "row wrap",
          minHeight: "50px",
          letterSpacing: "0.03em",
          lineHeight: "30px",
          py: "10px",
          px: "20px",
        }}
      >
        <Heading
          as="h3"
          sx={{
            flex: "0 1 auto",
            fontSize: "14px",
            my: 0,
            mx: "auto",
            display: "block",
            fontWeight: "bold",
            lineHeight: "30px",
          }}
        >
          {title}
        </Heading>
      </Box>
      <Box sx={{ flex: "1" }}>{children}</Box>
    </Box>
  )
}

const ImageExampleBox = ({ title, image, alt }) => (
  <ExampleBox title={title}>
    <Image src={image} variant="styles.CenteredBlock" alt={alt} />
  </ExampleBox>
)

export default {
  JSONTabs,
  Tooltip,
  Video,

  Switchable,
  Switch,

  Container,
  Button,
  Link,
  Box,
  Image,
  Text,
  Heading,

  FullWidthBox,
  Collapser,
  HomeFeature,

  Code,
  SolutionList,
  ImageExampleBox,

  wrapper: ContainExcept,
}
