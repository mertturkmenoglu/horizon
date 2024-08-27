'use client';

import { Button } from '@/components/ui/button';
import { formatBytes } from '@/lib/file-utils';
import * as collapsible from '@zag-js/collapsible';
import * as fileUpload from '@zag-js/file-upload';
import { PropTypes } from '@zag-js/react';
import { Upload, X } from 'lucide-react';
import Preview from './preview';

type Props = {
  capi: collapsible.Api;
  fapi: fileUpload.Api<PropTypes>;
};

export default function Dnd({ capi, fapi }: Readonly<Props>) {
  return (
    <div className="flex flex-col items-center">
      <div
        {...capi.getRootProps()}
        className="flex w-full flex-col items-center text-center"
      >
        <Button
          {...capi.getTriggerProps()}
          variant="ghost"
          size="icon"
        >
          <Upload className="size-4" />
        </Button>
        <div
          {...capi.getContentProps()}
          className="w-full"
        >
          <div
            {...fapi.getRootProps()}
            className="w-full rounded border border-dashed border-muted-foreground p-4"
          >
            <div {...fapi.getDropzoneProps()}>
              <input {...fapi.getHiddenInputProps()} />
              <span>Drag your file(s) here</span>
              <span className="text-muted-foreground"> or</span>
            </div>

            <Button
              {...fapi.getTriggerProps()}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Choose file(s)
            </Button>

            <ul
              {...fapi.getItemGroupProps()}
              className="mt-4 grid grid-cols-2 place-content-center gap-4"
            >
              {fapi.acceptedFiles.map((file) => (
                <li
                  key={file.name}
                  {...fapi.getItemProps({ file })}
                >
                  <div className="flex w-full items-center gap-2 rounded-lg px-4 py-2 hover:bg-sky-500/10">
                    <Preview file={file} />

                    <div className="ml-2 flex flex-col items-start">
                      <div className="text-sm font-semibold">{file.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatBytes(file.size)}
                      </div>
                    </div>

                    <Button
                      {...fapi.getItemDeleteTriggerProps({
                        file,
                      })}
                      className="ml-auto size-6 p-0 hover:bg-red-500 hover:text-white"
                      variant="ghost"
                      size="sm"
                    >
                      <X className="size-3" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
