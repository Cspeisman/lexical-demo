import {Editor} from "./Editor";
import {render, screen} from "@testing-library/react";

describe('Editor', () => {
  it('should render hello world', async () => {

    render(<Editor txt="Hello world"  searchString="" />)
    await screen.findByText('Hello world');
  });
});
