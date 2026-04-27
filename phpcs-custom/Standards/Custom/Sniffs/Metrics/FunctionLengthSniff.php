<?php

namespace PHP_CodeSniffer\Standards\Custom\Sniffs\Metrics;

use PHP_CodeSniffer\Files\File;
use PHP_CodeSniffer\Sniffs\Sniff;

class FunctionLengthSniff implements Sniff
{
    public int $maxLength = 40;

    public function register()
    {
        return [T_FUNCTION];
    }

    public function process(File $phpcsFile, $stackPtr)
    {
        $tokens = $phpcsFile->getTokens();
        $function = $tokens[$stackPtr];

        if (isset($function['scope_opener'], $function['scope_closer'])) {
            $start = $tokens[$function['scope_opener']]['line'];
            $end = $tokens[$function['scope_closer']]['line'];
            $length = $end - $start + 1;

            if ($length > $this->maxLength) {
                $phpcsFile->addError(
                    "Function is too long. Found $length lines, maximum is {$this->maxLength}.",
                    $stackPtr,
                    'TooLong'
                );
            }
        }
    }
}
