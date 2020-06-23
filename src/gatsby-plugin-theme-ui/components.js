import React, { useContext, useEffect, useRef } from "react"
import { ModeContext } from "components/organisms/SwitchableMode/Provider"
import SolutionLineArrow from "./solution-line-arrow.svg"
import Collapser from "components/atoms/Collapser"
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
import { alpha, mix } from "@theme-ui/color"
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
  container = Container,
  fullWidthComponents = ["FullWidthBox"],
  children,
}) => {
  const processedChildren = groupApply(
    children,
    child => !fullWidthComponents.includes(child.props.mdxType),
    (group, i) => <Container key={`wrapped-container-${i}`}>{group}</Container>
  )
  return <>{processedChildren}</>
}

const tooltipTypes = {
  dependencies: {
    color: "#F6936A",
    href: "#dependencies",
    title: "Dependencies",
  },
  reports: {
    color: "#BB8DDA",
    href: "#reports",
    title: "Reports",
  },
  dvc: {
    color: "#E3EE9E",
    href: "#dvc",
    title: "DVC",
  },
  tensorboard: {
    color: "#B6E8ED",
    href: "#tensorboard",
    title: "Tensorboard",
  },
}

const Tooltip = ({ sx = {}, className, type, children }) => {
  const { color, href, title = type } = tooltipTypes[type]
  return (
    <Link
      as={"a"}
      aria-describedby={title}
      href={href}
      className={className}
      sx={{
        variant: "styles.Highlight",
        position: "relative",
        ">span": {
          backgroundColor: alpha(color, 0.2),
        },
        "&:hover>span": {
          color: mix("background", color, 0.3),
          backgroundColor: alpha(color, 0.3),
        },
        ":before": {
          variant: "styles.Tooltip.Bubble",
          content: `"${title}"`,
        },
        ":after": {
          variant: "styles.Tooltip.Arrow",
        },
        "&:hover:before, &:hover:after": {
          variant: "styles.Tooltip.Active",
        },
      }}
    >
      {children}
    </Link>
  )
}

const FullWidthBox = ({
  originalType,
  children,
  className,
  sx: { inner, ...sx },
  ...props
}) => {
  return (
    <Box variant="styles.FullWidthBox" className={className} sx={sx} {...props}>
      <Container sx={inner}>{children}</Container>
    </Box>
  )
}

FullWidthBox.isFullWidth = true

const Video = ({
  sx = {},
  mode,
  autoplay,
  playsinline = true,
  controls = true,
  ...props
}) => {
  const contextMode = useContext(ModeContext)
  const videoRef = useRef()
  const videoElement = videoRef.current
  useEffect(() => {
    if (mode) {
      if (contextMode !== mode && videoElement) {
        videoElement.pause()
      }
    }
  }, [mode, contextMode, videoElement])
  return (
    <Box
      as="video"
      ref={videoRef}
      autoplay={autoplay}
      playsinline={playsinline}
      controls={controls}
      sx={{
        my: 4,
        maxWidth: "100%",
        ...sx,
      }}
      {...props}
    />
  )
}

const Circle = ({ color }) => (
  <Box
    sx={{
      bg: color,
      width: "50px",
      height: "50px",
      mx: "auto",
      borderRadius: "50%",
    }}
  />
)

const HomeFeature = ({ children, heading, icon: Icon }) => {
  return (
    <Box
      sx={{
        borderTopStyle: ["solid", null, "none"],
        borderLeftStyle: ["none", null, "solid"],
        borderWidth: "1px",
        borderColor: "rgba(255,255,255,0.3)",
        mx: "auto",
        px: [1, null, 2],
        py: ["40px", "25px"],
        maxWidth: "600px",
        svg: {
          mb: ["20px", null, "30px"],
        },
        "&:first-of-type": {
          borderTop: "none",
          borderLeft: "none",
        },
      }}
    >
      <Icon />
      <Heading as="h3" sx={{ my: 3 }}>
        {heading}
      </Heading>
      <Box>{children}</Box>
    </Box>
  )
}

const getRepoIcon = host => {
  switch (host) {
    case "github.com":
      return GitHubIcon
    case "gitlab.com":
      return GitLabIcon
    default:
      return null
  }
}

const RepoButton = ({ url, host = new URL(url).host }) => {
  const Icon = getRepoIcon(host)
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

const Code = ({ children, lang, filename, repo, sx = {}, ...props }) => {
  const renderHeader = lang || filename
  const parsedURL = repo && new URL(repo)
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
              sx={{
                backgroundColor: "cyan.0",
                "&:hover": { backgroundColor: "cyan.1" },
                lineHeight: "21px",
                height: "30px",
                borderRadius: "30px",
                fontSize: "14px",
                py: 0,
              }}
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

const ImageExampleBox = ({ title, image }) => (
  <ExampleBox title={title}>
    <Image src={image} variant="styles.CenteredBlock" />
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
